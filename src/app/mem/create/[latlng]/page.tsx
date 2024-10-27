"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Box, Button, TextField, ThemeProvider, Typography, Autocomplete } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import PageBottomNavigation, { theme } from "@/components/PageBottomNavigation";
import goBack from "@/img/goback.svg";
import happyImg from "@/img/emoji-happy.svg";
import sadImg from "@/img/emoji-sad.svg";
import angryImg from "@/img/emoji-angry.svg";
import { getFromLocalStorage } from "@/utils/requests/api";
import { addMapSpot, uploadPicture } from "@/utils/requests/MapSpot";
import options from "@/utils/makeYears";

interface FormData {
  file: File | null;
}

export default function CreateMemory({ params }: { params: { latlng: string } }) {
  const router = useRouter();

  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    if (!getFromLocalStorage()) {
      router.push("/login");
      return;
    }
    setLatitude(Number(params.latlng.split("%2C")[0]));
    setLongitude(Number(params.latlng.split("%2C")[1]));
    let usr = getFromLocalStorage();
    if (usr) {
      setUserId(usr.id);
    }
  }, [latitude, longitude, params.latlng, router]);

  const handleGoBack = () => {
    router.push("/");
  }
  
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState<string>("");
  const [year, setYear] = useState<string | null>("");
  const [mood, setMood] = useState<number>(0);
  const handleMoodChange = (e: { target: { value: unknown; } }) => {
    setMood(Number(e.target.value));
  }

  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState<FormData>({ file: null });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // File extension being an image
      const fExt = String(file.name).split(".").at(-1)?.toLowerCase();
      const validExt = Boolean(fExt == "jpg" || fExt == "jpeg" || fExt == "png" || fExt == "gif");

      // File size lower than 50MB
      const validSize = Boolean(file.size <= 50 * 1024 * 1024);

      if (!validExt || !validSize) {
        setError("A imagem deve ser JPG, PNG ou GIF e ser menor que 50MB.");
        setFormData({ file: null });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setFormData({ file: file });
        setError(null);
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    if (!description || !year) {
      setError("Preencha o campo descrição.");
      setLoading(false);
      return null;
    } else {
      const preparedDescription = `${description}\n\nAno: ${year}`;
      let imageUploaded = "";
      let wasSentAnImage = false;
      if (formData.file) {
        wasSentAnImage = true;
        const form = new FormData();
        form.append('file', formData.file);

        try {
          const response = await uploadPicture(form);
          imageUploaded = response;
        } catch (error) {
          console.log(error);
          setError("Ocorreu um erro ao enviar a imagem, tente novamente.");
          return;
        }
      }

      const imageValidToUpload = Boolean(wasSentAnImage && imageUploaded);
      
      const mapSpotToAdd = {
        description: preparedDescription,
        type: mood,
        picture: imageValidToUpload ? imageUploaded : "",
        latitude: latitude,
        longitude: longitude,
        userId: userId
      }

      try {
        const response = await addMapSpot(mapSpotToAdd);
        router.push(`/mem/${response.guid}`);
        setLoading(false);
        return;
      } catch (error) {
        console.log(error);
        setError("Erro ao salvar a memória, tente novamente.");
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <button
        className="py-4 px-2"
        onClick={handleGoBack}
      >
        <Image
          src={goBack}
          alt="Voltar"
          width={53}
          priority={true}
          quality={100}
          title="Voltar"
        />
      </button>

      <ThemeProvider theme={theme}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            maxWidth: 380,
            margin: "0 auto",
          }}
        >
          <h1 className="text-5xl font-black text-[#554FFF] py-3">
            Registre sua memória
          </h1>

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}

          <TextField
            id="outlined-multiline-static"
            label="Descrição da memória"
            multiline
            maxRows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Autocomplete
            disablePortal
            options={options}
            renderInput={(params) => <TextField {...params} label="Ano" />}
            value={year}
            onChange={(e, newValue) => {
              setYear(newValue);
            }}
          />
          
          <h3>Insira uma foto (se houver):</h3>
          
          <div id="pics">
            <label htmlFor="file">
              <input
                type="file"
                id="pictures"
                name="file"
                accept="images/*"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </label>
          </div>

          <h3>Tipo de memória:</h3>

          <div id="mood" className="flex justify-between">
            <label className="flex flex-col gap-3 justify-center items-center">
              <Image
                src={happyImg}
                alt="Feliz"
                width={45}
                height={40}
                priority={true}
                quality={75}
                title="Feliz"
              />
              <input
                type="radio"
                value={0}
                checked={mood === 0}
                onChange={handleMoodChange}
              />
            </label>
            
            <label className="flex flex-col gap-3 justify-center items-center">
              <Image
                src={sadImg}
                alt="Triste"
                width={45}
                height={40}
                priority={true}
                quality={75}
                title="Triste"
              />
              <input
                type="radio"
                value={1}
                checked={mood === 1}
                onChange={handleMoodChange}
              />
            </label>

            <label className="flex flex-col gap-3 justify-center items-center">
              <Image
                src={angryImg}
                alt="Brava"
                width={48}
                height={40}
                priority={true}
                quality={75}
                title="Brava"
              />
              <input
                type="radio"
                value={2}
                checked={mood === 2}
                onChange={handleMoodChange}
              />
            </label>
          </div>


          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            { loading ? "Carregando..." : "Registrar"}
          </Button>
        </Box>
      </ThemeProvider>
            
      <PageBottomNavigation />
    </div>
  );
}

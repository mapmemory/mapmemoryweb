"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Box, Button, TextField, ThemeProvider, Typography, Autocomplete } from "@mui/material";
import { useState } from "react";

import { theme } from "@/components/PageBottomNavigation";
import goBack from "@/img/goback.svg";

export default function Login() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/app");
  }

  const [description, setDescription] = useState("");
  const [classOfUser, setClassOfUser] = useState<null | string>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [error, setError] = useState<null | string>(null);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!description || !classOfUser || !email || !password || !passwordRetype) {
      setError("Complete os campos, por favor.");
      return;
    }
    if (password !== passwordRetype) {
      setError("As senhas não coincidem.");
      return;
    }
    setError(null);
    console.log("Cadastro:", { description, classOfUser, email, password });
  };

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
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <h1 className="text-5xl font-black text-[#554FFF] py-3">
            Cadastro
          </h1>

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}

          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Autocomplete
            disablePortal
            options={[
              "TI 1",
              "TI 2",
              "TI 3",
              "TI 4",
              "TQ 1",
              "TQ 2",
              "TQ 3",
              "TQ 4",
              "TMA 1",
              "TMA 2",
              "TMA 3",
              "TMA 4",
              "TA 1",
              "TA 2",
              "TA 3",
              "TA 4"
            ]}
            renderInput={(params) => <TextField {...params} label="Turma" />}
            value={classOfUser}
            onChange={(e, newValue) => {
              setClassOfUser(newValue);
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            label="Repita a senha"
            variant="outlined"
            type="password"
            fullWidth
            value={passwordRetype}
            onChange={(e) => setPasswordRetype(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Registrar e entrar
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}

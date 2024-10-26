"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Box, Button, TextField, ThemeProvider, Typography, Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";

import { theme } from "@/components/PageBottomNavigation";
import goBack from "@/img/goback.svg";
import { registerUser } from "@/utils/requests/User";
import { getFromLocalStorage, putInLocalStorage } from "@/utils/requests/api";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getFromLocalStorage()) {
      router.push("/app");
    }
  });

  const handleGoBack = () => {
    router.push("/app");
  }

  const handleGoLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push("/login");
  }

  const [name, setName] = useState("");
  const [classOfUser, setClassOfUser] = useState<null | string>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);

    if (!name || !classOfUser || !email || !password || !passwordRetype) {
      setError("Complete os campos, por favor.");
      return;
    }
    if (password !== passwordRetype) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }
    setError(null);

    try {
      const { token, user } = await registerUser(name, email, password);

      putInLocalStorage({
        token: token,
        guid: user.guid,
        name: user.name,
        email: user.email,
        class: user.class,
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Erro ao registrar usuário, tente novamente.");
      setLoading(false);
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            { loading ? "Carregando..." : "Registrar e entrar" }
          </Button>

          <div className="text-[#554FFF] font-normal">
            Já possui uma conta? 
            <button
              className="font-bold underline pl-2"
              onClick={handleGoLogin}
            >
              Faça login
            </button>
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}

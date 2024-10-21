"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { Box, Button, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";

import { theme } from "@/components/PageBottomNavigation";
import goBack from "@/img/goback.svg";

export default function Login() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/app");
  }

  const handleGoRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push("/register");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Complete os campos, por favor.");
      return;
    }
    setError(null);
    console.log("Login:", { email, password });
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
            Login
          </h1>

          {error && (
            <Typography color="error">
              {error}
            </Typography>
          )}

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

          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            Entrar
          </Button>

          <div className="text-[#554FFF] font-normal">
            Não possui conta? 
            <button
              className="font-bold underline pl-2"
              onClick={handleGoRegister}
            >
              Cadastre-se
            </button>
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}

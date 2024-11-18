"use client";

import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Typography,
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import PageBottomNavigation, { theme } from "@/components/PageBottomNavigation";
import goBack from "@/img/goback.svg";

import { getFromLocalStorage, putInLocalStorage, removeFromLocalStorage } from "@/utils/requests/api";
import { listOfClasses } from "@/utils/classes";
import { updateUser, deleteUser } from "@/utils/requests/User";

export default function Login() {
  const router = useRouter();

  const [uuidUser, setUuidUser] = useState("");
  const [name, setName] = useState("");
  const [classOfUser, setClassOfUser] = useState<null | string | undefined>(null);
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetype, setPasswordRetype] = useState("");

  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);

  const [dialogOpen, setDialogOpen] = useState(false); 

  useEffect(() => {
    const storageData = getFromLocalStorage();
    if (!storageData) {
      router.push("/login");
      return;
    }
    setUuidUser(storageData.guid);
    setName(storageData.name);
    setClassOfUser(listOfClasses.at(storageData?.class) || "");
    setEmail(storageData.email);
  }, []);

  const handleGoBack = () => {
    router.push("/app");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!name || !classOfUser || !email || !password || !passwordRetype) {
      setError("Complete os campos, por favor.");
      return;
    }
    if (password !== passwordRetype) {
      setError("As senhas não coincidem.");
      return;
    }
    setError(null);

    const classToSaveEnum = listOfClasses.indexOf(classOfUser);
    const userUpdateBody = {
      email: email,
      oldPassword: oldPassword,
      newPassword: password,
      name: name,
      class: classToSaveEnum,
    };

    try {
      const { token, foundUser } = await updateUser(uuidUser, userUpdateBody);

      putInLocalStorage({
        token: token,
        id: foundUser.id,
        guid: foundUser.guid,
        name: foundUser.name,
        email: foundUser.email,
        class: foundUser.class,
      });

      setSuccess("Usuário atualizado com sucesso.");
      setOldPassword("");
      setPassword("");
      setPasswordRetype("");
    } catch (error) {
      console.log(error);
      setError("Erro ao atualizar, tente novamente (verifique se a senha coincide).");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(uuidUser);
      removeFromLocalStorage();
      setDialogOpen(false);
      router.push("/about");
      return;
    } catch (error) {
      console.log(error);
      setError("Erro ao excluir a conta, tente novamente.");
    }
  };

  return (
    <div>
      <button className="py-4 px-2" onClick={handleGoBack}>
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
            Atualização do cadastro
          </h1>

          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="success">{success}</Typography>}

          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            fullWidth
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />

          <Autocomplete
            disablePortal
            options={listOfClasses}
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
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Senha atual"
            variant="outlined"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <TextField
            label="Nova senha (caso deseje manter apenas repita a mesma)"
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

          <Button variant="contained" color="primary" type="submit">
            Atualizar
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => setDialogOpen(true)} // Abre o Dialog
          >
            Excluir conta
          </Button>
        </Box>

        {/* Dialog de confirmação */}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <DialogTitle>Excluir Conta</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza de que deseja excluir sua conta? Essa ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteAccount} color="error">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>

      <PageBottomNavigation />
    </div>
  );
}

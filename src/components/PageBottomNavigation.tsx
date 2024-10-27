"use client";

import { BottomNavigation, BottomNavigationAction, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DiceIcon from '@mui/icons-material/Casino';
import NotLoggedIcon from '@mui/icons-material/Person';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountCircle from '@mui/icons-material/AccountCircle';
import House from "@mui/icons-material/House";
import QuestionMark from "@mui/icons-material/QuestionMark";

import { useRouter } from "next/navigation";
import { api, getFromLocalStorage, route } from "@/utils/requests/api";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#554FFF',
          textTransform: 'none',
          fontWeight: 'bold',
        }
      }
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-selected': {
            color: '#FFD799',
          },
        },
      },
    }
  },
});

export default function PageBottomNavigation() {
  const router = useRouter();

  const [logged, setLogged] = useState(false);
  const [firstName, setFirstName] = useState("");

  const [openUserDialog, setOpenUserDialog] = useState(false);
  
  const handleUserDialogClose = () => {
    setOpenUserDialog(false);
  }

  const logoutAction = () => {
    router.push("/user/logout");
  }

  const editAction = () => {
    router.push("/user/edit");
  }

  useEffect(() => {
    if (getFromLocalStorage() && logged === false) {
      setLogged(true);
      let usr = getFromLocalStorage();
      if (usr) {
        setFirstName(String(usr.name).split(" ")[0]);
      }
    }
  }, [logged]);

  const [page, setPage] = useState(null);

  const handleRandomClick = async () => {
    try {
      const response = await api.get(`${route}/MapSpot/getRandomSpotGuid`);
      if (response.data.length === 36) router.push(`/mem/${response.data}`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleTutorialClick = () => {
    router.push("tutorial/step/1");
  }
  
  const handleHomeClick = () => {
    router.push("/app");
  }

  const handleLoginClick = () => {
    router.push("/login");
  }

  const handleLogoutClick = () => {
    setOpenUserDialog(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 15,
        }}
      >
        <BottomNavigation
          sx={{
            backgroundColor: "#554FFF",
            color: "#fff"
          }}
          showLabels
          value={page}
          onChange={(event, newPage) => {
            setPage(newPage);
            if (newPage === 0) {
              handleHomeClick();
            }
            if (newPage === 1) {
              if (!logged) {
                handleTutorialClick();
              } else {
                return;
              }
            }
            if (newPage === 2) {
              console.log("aleatorio clicado;;;");
              handleRandomClick();
            }
            if (newPage === 3) {
              if (!logged) {
                handleLoginClick();
              } else {
                handleLogoutClick();
              }
            }
          }}
        >
          <BottomNavigationAction
            label="Início"
            icon={<House />}
          />

          {
            logged ?
              <BottomNavigationAction
                label="Memórias"
                icon={<WidgetsIcon />}
              />
              :
              <BottomNavigationAction
              label="Ajuda"
              icon={<QuestionMark />}
            />
          }

          <BottomNavigationAction
            label="Aleatório"
            icon={<DiceIcon />}
          />

          {
            logged ? 
              <BottomNavigationAction
                label={firstName}
                icon={<AccountCircle />}
              />
            :
            <BottomNavigationAction
              label="Login"
              icon={<NotLoggedIcon />}
            />
          }
          <Dialog
            open={openUserDialog}
            onClose={handleUserDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {`Olá, ${firstName}.`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Você pode alterar os dados, remover sua conta ou sair.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={editAction}>Editar</Button>
              <Button onClick={logoutAction}>
                Sair
              </Button>
              <Button onClick={handleUserDialogClose} sx={{backgroundColor: "#fff", color: "#444FFF"}} autoFocus>
                Voltar
              </Button>
            </DialogActions>
          </Dialog>
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}

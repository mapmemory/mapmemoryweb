"use client";

import { BottomNavigation, BottomNavigationAction, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DiceIcon from '@mui/icons-material/Casino';
import NotLoggedIcon from '@mui/icons-material/Person';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useRouter } from "next/navigation";
import { getFromLocalStorage } from "@/utils/requests/api";

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
    },
  },
});

export default function PageBottomNavigation() {
  const router = useRouter();

  const [logged, setLogged] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [turm, setTurm] = useState("");

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
      setFirstName(String(getFromLocalStorage().name).split(" ")[0]);
      setEmail(String(getFromLocalStorage().email));
      setTurm(String(getFromLocalStorage().class));
    }
  }, [logged]);

  const [page, setPage] = useState(null);

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
            if (newPage === 2) {
              if (!logged) {
                handleLoginClick();
              } else {
                handleLogoutClick();
              }
            }
          }}
        >
          <BottomNavigationAction
            label="Memórias"
            icon={<WidgetsIcon />}
          />

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
              <Button onClick={editAction}>Editar conta</Button>
              <Button onClick={logoutAction} autoFocus>
                Sair
              </Button>
            </DialogActions>
          </Dialog>
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}

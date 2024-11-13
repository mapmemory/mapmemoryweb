"use client";

import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DiceIcon from '@mui/icons-material/Casino';
import NotLoggedIcon from '@mui/icons-material/Person';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountCircle from '@mui/icons-material/AccountCircle';
import House from "@mui/icons-material/House";
import QuestionMark from "@mui/icons-material/QuestionMark";
import BookmarksIcon from '@mui/icons-material/Bookmarks';

import { useRouter } from "next/navigation";
import { api, getFromLocalStorage, route } from "@/utils/requests/api";
import { getMapSpots, MapSpot } from "@/utils/requests/MapSpot";

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
  const [openMemoriesModal, setOpenMemoriesModal] = useState(false);
  const [mapSpots, setMapSpots] = useState<MapSpot[]>([]);
  
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

  useEffect(() => {
    async function fetchMapSpots() {
      const spots =await getMapSpots();
      setMapSpots(spots);
    }

    if (mapSpots.length === 0 && logged) {
      fetchMapSpots();
    }
  }, [mapSpots]);
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
                onClick={() => setOpenMemoriesModal(true)}
              />
              :
              <BottomNavigationAction
              label="Ajuda"
              icon={<QuestionMark />}
            />
          }

          <BottomNavigationAction
            label="Memórias"
            icon={<WidgetsIcon />}
            onClick={() => setOpenMemoriesModal(true)}
          />

          <Modal
            open={openMemoriesModal}
            onClose={() => setOpenMemoriesModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", padding: "0.2rem", backgroundColor: "#554FFF", height: "80%", width: "80%" }}>
              <Button onClick={() => setOpenMemoriesModal(false)} className="text-black relative top-1 left-0 text-lg">X</Button>
              
              <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column", alignItems: "center", width: "100%", height: "100%" }}>
                <h1 className="text-white text-3xl font-bold">Memórias</h1>
                
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "85%", overflowY: "auto", backgroundColor: "#559FFF" }}>
                  {mapSpots.map((spot: MapSpot) => (
                    <Card
                      sx={{ maxWidth: 345, minHeight: 130, margin: 1, cursor: "pointer" }}
                      key={spot.guid}
                      onClick={() => router.push(`/mem/${spot.guid}`)}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h6" className="text-black font-bold" component="div" noWrap>
                          {spot.name}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600 font-bold overflow-hidden text-ellipsis max-h-[3.5rem]">
                          {spot.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}

                  <Card
                    sx={{ maxWidth: 345, minHeight: 130, margin: 1 }}

                    
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h6" className="text-black font-bold" component="div" noWrap>
                        Nameeee
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 font-bold overflow-hidden text-ellipsis max-h-[3.5rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repudiandae ex dolorum eius voluptates neque illo sunt aut aliquid. Ut iure, numquam quo itaque soluta repellendus dolore temporibus quisquam cum!
                      </Typography>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{ maxWidth: 345, minHeight: 130, margin: 1 }}
                    
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h6" className="text-black font-bold" component="div" noWrap>
                        Nameeee
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 font-bold overflow-hidden text-ellipsis max-h-[3.5rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repudiandae ex dolorum eius voluptates neque illo sunt aut aliquid. Ut iure, numquam quo itaque soluta repellendus dolore temporibus quisquam cum!
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ maxWidth: 345, minHeight: 130, margin: 1 }}
                    
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h6" className="text-black font-bold" component="div" noWrap>
                        Nameeee
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 font-bold overflow-hidden text-ellipsis max-h-[3.5rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repudiandae ex dolorum eius voluptates neque illo sunt aut aliquid. Ut iure, numquam quo itaque soluta repellendus dolore temporibus quisquam cum!
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ maxWidth: 345, minHeight: 130, margin: 1 }}
                    
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h6" className="text-black font-bold" component="div" noWrap>
                        Nameeee
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 font-bold overflow-hidden text-ellipsis max-h-[3.5rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repudiandae ex dolorum eius voluptates neque illo sunt aut aliquid. Ut iure, numquam quo itaque soluta repellendus dolore temporibus quisquam cum!
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card
                    sx={{ maxWidth: 345, minHeight: 130, margin: 1 }}
                    
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h6" className="text-black font-bold" component="div" noWrap>
                        Nameeee
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 font-bold overflow-hidden text-ellipsis max-h-[3.5rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repudiandae ex dolorum eius voluptates neque illo sunt aut aliquid. Ut iure, numquam quo itaque soluta repellendus dolore temporibus quisquam cum!
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card
                    sx={{ maxWidth: 345, minHeight: 130, margin: 1 }}
                    
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h6" className="text-black font-bold" component="div" noWrap>
                        Nameeee
                      </Typography>
                      <Typography variant="body2" className="text-gray-600 font-bold overflow-hidden text-ellipsis max-h-[3.5rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repudiandae ex dolorum eius voluptates neque illo sunt aut aliquid. Ut iure, numquam quo itaque soluta repellendus dolore temporibus quisquam cum!
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              
              </Box>

            </Box>
          </Modal>

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

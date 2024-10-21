"use client";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DiceIcon from '@mui/icons-material/Casino';
import NotLoggedIcon from '@mui/icons-material/Person';
import WidgetsIcon from '@mui/icons-material/Widgets';

import { useRouter } from "next/navigation";

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

  const [page, setPage] = useState(null);

  const handleLoginClick = () => {
    router.push("/login");
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
              handleLoginClick();
            }
            console.log(page);
          }}
        >
          <BottomNavigationAction
            label="Memories"
            icon={<WidgetsIcon />}
          />

          <BottomNavigationAction
            label="Random"
            icon={<DiceIcon />}
          />

          <BottomNavigationAction
            label="Login"
            icon={<NotLoggedIcon />}
          />
        </BottomNavigation>
      </Box>
    </ThemeProvider>
  );
}

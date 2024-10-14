"use client";

import { BottomNavigation, BottomNavigationAction, Box, createTheme } from "@mui/material";
import { useState } from "react";

import NavigationIcon from '@mui/icons-material/Navigation';

export default function PageBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box sx={
        {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }
      }
    >
      <BottomNavigation
        sx={
          {
            backgroundColor: "#554FFF",
            color: "#fff"
          }
        }
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue);
        }}
      >
        <BottomNavigationAction
          color="white"
          label="Início"
          icon={ <NavigationIcon /> }
        />
      </BottomNavigation>
    </Box>
  );
}
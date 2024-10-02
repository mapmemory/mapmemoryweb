"use client";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { lightBlue } from "@mui/material/colors";

export default function PageBottomNavigation() {
  const [value, setValue] = useState(0);
  
  return (
    <Box sx={
      {
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%"
      }
    }>
      <BottomNavigation
        sx={
          {
            backgroundColor: "#ddf",
            color: "#fff"
          }
        }

        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{color: lightBlue }}
          label="Início"
          icon={ <HomeIcon /> }
        />
      </BottomNavigation>
    </Box>
  );
}
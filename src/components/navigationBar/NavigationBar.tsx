"use client";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";

export default function NavigationBar() {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(_, newValue) => setValue(newValue)}
      sx={(theme) => ({
        position: "fixed",
        bottom: 0,
        width: "100%",
        maxWidth: theme.breakpoints.values.md,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: theme.zIndex.appBar,
        borderTop: `1px solid ${theme.palette.divider}`,
        paddingBottom: "env(safe-area-inset-bottom)",
      })}
    >
      <BottomNavigationAction label="Home" icon={<HomeFilledIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
      <BottomNavigationAction label="Account" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}

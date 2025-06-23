"use client";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import { usePathname, useRouter } from "next/navigation";

export default function NavigationBar() {
  const pathname = usePathname();
  const router = useRouter();
  const routes = ["/", "/favorites", "/messages", "/account"];
  const current = Math.max(routes.indexOf(pathname), 0);

  return (
    <BottomNavigation
      showLabels
      value={current}
      onChange={(_, i) => router.push(routes[i])}
      sx={{ width: "100%", maxWidth: (theme) => theme.breakpoints.values.md }}
    >
      <BottomNavigationAction label="Home" icon={<HomeFilledIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Messages" icon={<MessageIcon />} />
      <BottomNavigationAction label="Account" icon={<PersonIcon />} />
    </BottomNavigation>
  );
}

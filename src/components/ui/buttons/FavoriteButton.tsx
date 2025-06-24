"use client";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import { useTransition, useOptimistic } from "react";

type Props = {
  petId: string;
  initiallyFav: boolean;
};

export default function FavoriteButton({ petId, initiallyFav }: Props) {
  const [isPending, start] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic(initiallyFav);

  const toggle = () => {
    setOptimistic(!optimistic);
    start(async () => {
      const method = optimistic ? "DELETE" : "POST";
      await fetch("/api/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ petId }),
      });
    });
  };

  return (
    <IconButton
      onClick={toggle}
      disabled={isPending}
      sx={{ color: optimistic ? "#ed9426" : "inherit" }}
    >
      {optimistic ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
}

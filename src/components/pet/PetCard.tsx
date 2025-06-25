"use client";

import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "../ui/buttons/FavoriteButton";

type Props = {
  id: string;
  name: string;
  age: string;
  breed: string | null;
  size: string;
  imageUrl: string | null;
  isFavorite?: boolean;
  onUnfavorited?: (petId: string) => void;
  onFavoriteRestored?: (petId: string) => void;
};

export default function PetCard({
  id,
  name,
  imageUrl,
  isFavorite = false,
  onUnfavorited,
  onFavoriteRestored,
}: Props) {
  return (
    <div className="relative block overflow-hidden hover:opacity-80">
      <Link href={`/pet/${id}`}>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={300}
            className="md:h-48 h-38 w-full object-cover rounded-xl"
          />
        )}

        <div className="p-4 space-y-1">
          <h3 className="font-semibold text-lg">{name}</h3>
        </div>
      </Link>

      <div className="absolute top-2 right-2">
        <FavoriteButton
          petId={id}
          initiallyFav={isFavorite}
          onUnfavorited={onUnfavorited}
          onFavoriteRestored={onFavoriteRestored}
        />
      </div>
    </div>
  );
}

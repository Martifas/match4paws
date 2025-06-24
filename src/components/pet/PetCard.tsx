"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  id: string;
  name: string;
  age: string;
  breed: string | null;
  size: string;
  imageUrl: string | null;
};

export default function PetCard({ id, name, imageUrl }: Props) {
  return (
    <Link
      href={`/pet/${id}`}
      className="block overflow-hidden hover:opacity-80"
    >
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
  );
}

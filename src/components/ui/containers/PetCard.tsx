"use client";

import Image from "next/image";

type Props = {
  id: string;
  name: string;
  age: string;
  breed: string | null;
  size: string;
  imageUrl: string | null;
};

export default function PetCard({ name, age, breed, size, imageUrl }: Props) {
  return (
    <article className="overflow-hidden rounded-xl shadow ring-1 ring-gray-200">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={300}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-4 space-y-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          {age} • {size}
          {breed ? ` • ${breed}` : null}
        </p>
      </div>
    </article>
  );
}

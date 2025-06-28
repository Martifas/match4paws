'use client';
import Link from 'next/link';
import Image from 'next/image';
import PrimaryButton from '@/components/ui/buttons/PrimaryButton';

export default function Hero() {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center text-center">
      <Image
        src="/reksiukas.jpg"
        alt="Happy adopted dog"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10"></div>

      <div className="relative z-20 space-y-6 max-w-2xl mx-auto px-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-wide text-white leading-tight drop-shadow-lg">
          Find your perfect match
        </h1>
        <p className="text-lg md:text-xl text-gray-100 drop-shadow select-none">
          Browse hundreds of pets looking for loving homes or list your own pet
          for adoption.
        </p>
        <div className="flex flex-col w-3/5 mx-auto sm:flex-row gap-3 justify-center">
          <PrimaryButton>
            <Link href="/search">Browse pets</Link>
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

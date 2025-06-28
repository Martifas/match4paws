'use client';

import PawIcon from '@/assets/icons/PawIcon';
import Header from '@/components/ui/containers/Header';
import SearchButton from '@/components/ui/buttons/SearchButton';
import Link from 'next/link';
import { useAuth } from '@/lib/authProvider';
import Hero from './Hero';
import { FeaturedPet, FeaturedPets } from './FeaturedPet';
import HowItWorks from './HowItWorks';

export default function Homepage({ pets }: { pets: FeaturedPet[] }) {
  const user = useAuth();
  return (
    <div>
      <Header
        left={<PawIcon className="w-6 h-6 text-[#ed9426]" />}
        center={
          <h1 className="text-lg font-semibold tracking-wide select-none">
            Match4Paws
          </h1>
        }
        right={
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <SearchButton />
              </>
            ) : (
              <Link
                aria-label="Login"
                href="/auth/login"
                className="text-[#ed9426] font-medium"
              >
                Log&nbsp;in
              </Link>
            )}
          </div>
        }
      />
      <Hero />
      <FeaturedPets pets={pets} />
      <HowItWorks />
    </div>
  );
}

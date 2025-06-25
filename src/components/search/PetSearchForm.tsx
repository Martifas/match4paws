'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ToggleChip, { ToggleValue } from '../ui/buttons/ToggleChip';
import Header from '../ui/containers/Header';
import BackButton from '../ui/buttons/BackButton';
import PrimaryButton from '../ui/buttons/PrimaryButton';
import BottomBar from '../ui/containers/BottomBar';
import { AGES, GENDERS, PET_TYPES, SIZES } from '@/lib/constants/petSearch';

export default function PetSearchForm() {
  const router = useRouter();

  const [petType, setPetType] = useState<ToggleValue<typeof PET_TYPES>>(null);
  const [gender, setGender] = useState<ToggleValue<typeof GENDERS>>(null);
  const [size, setSize] = useState<ToggleValue<typeof SIZES>>(null);
  const [age, setAge] = useState<ToggleValue<typeof AGES>>(null);

  const back = '/';

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (petType) params.set('type', petType);
    if (gender && gender !== 'any') params.set('gender', gender);
    if (size) params.set('size', size);
    if (age) params.set('age', age);

    router.push(`/searchresults?${params.toString()}`);
  };

  return (
    <>
      <Header
        left={<BackButton to={back} />}
        center={
          <h1 className="text-lg font-semibold tracking-wide select-none">
            Pet Search
          </h1>
        }
      />
      <div className="space-y-5 flex flex-col px-10 justify-between max-w-xl mx-auto">
        <section className="space-y-3">
          <h2 className="text-lg font-bold">Pet Types</h2>
          <ToggleChip
            items={PET_TYPES}
            selected={petType}
            onChange={setPetType}
            getId={p => p.id}
            render={p => (
              <span className="flex h-5 items-center gap-1">
                <p.IconComponent />
                <span>{p.label}</span>
              </span>
            )}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold">
            Gender <span className="text-sm text-gray-400">(Optional)</span>
          </h2>
          <ToggleChip
            items={GENDERS}
            selected={gender}
            onChange={setGender}
            render={g => g.label}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold">
            Size <span className="text-sm text-gray-400">(Optional)</span>
          </h2>
          <ToggleChip
            items={SIZES}
            selected={size}
            onChange={setSize}
            render={s => s.label}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold">
            Age <span className="text-sm text-gray-400">(Optional)</span>
          </h2>
          <ToggleChip
            items={AGES}
            selected={age}
            onChange={setAge}
            render={a => a.label}
          />
        </section>

        <BottomBar alwaysSticky>
          <PrimaryButton onClick={handleSubmit}> Search</PrimaryButton>
        </BottomBar>
      </div>
    </>
  );
}

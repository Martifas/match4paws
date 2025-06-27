import PetInfo from '@/components/pet/petInfo/PetInfo';

export default async function PetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="bg-white min-h-full flex flex-col">
      <PetInfo id={id} />
    </div>
  );
}

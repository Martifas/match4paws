import PetInfo from "@/components/pet/petInfo/PetInfo";

export default function PetPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white min-h-full flex flex-col">
      <PetInfo id={params.id} />
    </div>
  );
}

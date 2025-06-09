import PawIcon from "@/assets/PawIcon";

function Loading() {
  return (
    <div className="flex flex-col items-center h-screen bg-[#ed9426]">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <PawIcon />
        <h1 className="text-white text-3xl font-bold">Adoptify</h1>
      </div>
      <div className="pb-20">
        <h2 className="text-white text-2xl">Loading</h2>
      </div>
    </div>
  );
}

export default Loading;

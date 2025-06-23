"use client";

import PawIcon from "@/assets/PawIcon";
import SearchIcon from "@mui/icons-material/Search";

export default function Homepage() {
  return (
    <header className="border-b border-gray-200">
      <div className="w-full max-w-xl mx-auto px-4 py-2 flex items-center justify-between">
        <PawIcon className="w-6 h-6 text-[#ed9426]" />

        <h1 className="text-lg font-semibold tracking-wide select-none">
          Match4Paws
        </h1>

        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-50 active:bg-gray-100"
        >
          <SearchIcon fontSize="small" />
        </button>
      </div>
    </header>
  );
}

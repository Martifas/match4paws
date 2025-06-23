"use client";

import { useRouter } from "next/navigation";
import PawIcon from "@/assets/PawIcon";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../ui/containers/Header";

export default function HomepageHeader() {
  const router = useRouter();
  return (
    <Header
      left={<PawIcon className="w-6 h-6 text-[#ed9426]" />}
      center={
        <h1 className="text-lg font-semibold tracking-wide select-none">
          Match4Paws
        </h1>
      }
      right={
        <button
          type="button"
          onClick={() => router.push("/search")}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-50 active:bg-gray-100"
        >
          <SearchIcon fontSize="small" />
        </button>
      }
    />
  );
}

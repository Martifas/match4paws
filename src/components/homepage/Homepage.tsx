"use client";

import PawIcon from "@/assets/PawIcon";
import Header from "../ui/containers/Header";
import SearchButton from "../ui/buttons/SearchButton";

export default function HomepageHeader() {
  return (
    <Header
      left={<PawIcon className="w-6 h-6 text-[#ed9426]" />}
      center={
        <h1 className="text-lg font-semibold tracking-wide select-none">
          Match4Paws
        </h1>
      }
      right={<SearchButton />}
    />
  );
}

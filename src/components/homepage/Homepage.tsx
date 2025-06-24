"use client";

import PawIcon from "@/assets/PawIcon";
import Header from "@/components/ui/containers/Header";
import SearchButton from "@/components/ui/buttons/SearchButton";
import Link from "next/link";
import { useAuth } from "@/lib/authProvider";

export default function HomepageHeader() {
  const user = useAuth();
  return (
    <Header
      left={<PawIcon className="w-6 h-6 text-[#ed9426]" />}
      center={
        <h1 className="text-lg font-semibold tracking-wide select-none">
          Match4Paws
        </h1>
      }
      right={
        <div className="flex items-center gap-3">
          <SearchButton />

          {user ? (
            <>
              <Link href="/auth/logout" className="text-[#ed9426] font-medium">
                Log&nbsp;out
              </Link>
            </>
          ) : (
            <Link href="/auth/login" className="text-[#ed9426] font-medium">
              Log&nbsp;in
            </Link>
          )}
        </div>
      }
    />
  );
}

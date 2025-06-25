"use client";

import { createContext, useContext } from "react";

type User = {
  id: string;
  name?: string;
  email?: string;
} | null;

const AuthContext = createContext<User>(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={initialUser}>{children}</AuthContext.Provider>
  );
}

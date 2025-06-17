import "../index.scss";
import "../app/styles/globals.scss";
import type { Metadata } from "next";
import SimpleContainer from "@/components/ui/container/Container";

export const metadata: Metadata = {
  title: "Match 4 Paws",
  description: "Web site created with Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SimpleContainer>{children}</SimpleContainer>
      </body>
    </html>
  );
}

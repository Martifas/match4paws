import "../../index.scss";
import "../styles/globals.scss";
import type { Metadata } from "next";
import SimpleContainer from "@/components/ui/container/Container";
import ThemeRegistry from "../ThemeRegistry";
import NavigationBar from "@/components/navigationBar/NavigationBar";

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
        <ThemeRegistry>
          <SimpleContainer>{children}</SimpleContainer>
        </ThemeRegistry>
        <NavigationBar/>
      </body>
    </html>
  );
}

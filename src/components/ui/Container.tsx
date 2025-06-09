import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ReactNode } from "react";

interface SimpleContainerProps {
  children: ReactNode;
}

export default function SimpleContainer({ children }: SimpleContainerProps) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">{children} </Container>
    </>
  );
}

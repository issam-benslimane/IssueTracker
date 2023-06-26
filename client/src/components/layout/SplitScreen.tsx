import React from "react";
import { Container } from "./Container";

type SplitScreenProps = {
  children: React.ReactNode;
};

export const SplitScreen = ({ children }: SplitScreenProps) => {
  return (
    <Container className="grid grid-cols-[1fr_2fr] gap-10">
      {children}
    </Container>
  );
};

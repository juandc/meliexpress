import { type FC } from "react";
import { InputBar, NavBar } from "@/components/isomorphic";

export const NavBarContainer: FC = () => {
  return (
    <NavBar>
      <img src="/Logo_ML@2x.png" />
      <InputBar placeholder="Nunca pares de buscar" />
    </NavBar>
  );
};


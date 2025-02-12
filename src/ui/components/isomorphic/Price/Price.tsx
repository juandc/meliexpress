import { type ComponentProps } from "react";
import { BaseItem } from "@/types";

type Props = BaseItem["price"] & ComponentProps<"p">;

export const Price = ({
  currency,
  amount,
  decimals,
  ...props
}: Props) => {
  /* TODO: validate this is the correct way to write prices in AR */
  return (
    <p {...props}>
      {currency === "ARS" && "$ "}
      {new Intl.NumberFormat("es", { maximumSignificantDigits: 3 }).format(amount)}
      <small>{Number(decimals).toFixed(2).replace("0.", ",")}</small>
    </p>
  );
};

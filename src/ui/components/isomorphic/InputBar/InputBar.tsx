import { type FC, type ComponentProps } from "react";
import classes from "./InputBar.module.css";

type Props = ComponentProps<"input">;

export const InputBar: FC<Props> = ({ className, ...props }) => {
  const inputClasses = `${classes.InputBar} ${className}`;
  return (
    <input className={inputClasses} {...props} />
  );
};

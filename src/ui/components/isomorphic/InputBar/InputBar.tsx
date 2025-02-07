import { type FC, type InputHTMLAttributes } from "react";
import classes from "./InputBar.module.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const InputBar: FC<Props> = ({ className, ...props }) => {
  const inputClasses = `${classes.InputBar} ${className}`;
  return (
    <input className={inputClasses} {...props} />
  );
};

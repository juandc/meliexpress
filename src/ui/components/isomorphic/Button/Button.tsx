import {type FC, type ButtonHTMLAttributes } from "react";
import classes from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}

export const Button: FC<Props> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const btnClasses = `
    ${classes.Button}
    ${variant === "primary" ? classes.Button__primary : ""}
    ${variant === "secondary" ? classes.Button__secondary : ""}
    ${className ? className : ""}
  `;

  return (
    <button className={btnClasses} {...props}>
      {children}
    </button>
  );
};

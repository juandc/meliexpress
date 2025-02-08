import Link from "next/link";
import { type FC, type ButtonHTMLAttributes, type ComponentProps } from "react";
import classes from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const btnClasses = `
    ${classes.Button}
    ${variant === "primary" ? classes.Button__primary : ""}
    ${variant === "secondary" ? classes.Button__secondary : ""}
    ${variant === "ghost" ? classes.Button__ghost : ""}
    ${variant === "danger" ? classes.Button__danger : ""}
    ${className ? className : ""}
  `;

  return (
    <button className={btnClasses} {...props}>
      {children}
    </button>
  );
};

type AnchorProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
}

export const Anchor: FC<AnchorProps> = ({
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const btnClasses = `
    ${classes.Button}
    ${variant === "primary" ? classes.Button__primary : ""}
    ${variant === "secondary" ? classes.Button__secondary : ""}
    ${variant === "ghost" ? classes.Button__ghost : ""}
    ${variant === "danger" ? classes.Button__danger : ""}
    ${className ? className : ""}
  `;

  return (
    <Link className={btnClasses} {...props}>
      {children}
    </Link>
  );
};

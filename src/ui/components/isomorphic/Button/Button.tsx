import Link from "next/link";
import { type FC, type ButtonHTMLAttributes, type ComponentProps } from "react";
import classes from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
}

export const Button: FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}) => {
  const btnClasses = `
    ${classes.Button}
    ${variant === "primary" ? classes.Button__primary : ""}
    ${variant === "secondary" ? classes.Button__secondary : ""}
    ${variant === "ghost" ? classes.Button__ghost : ""}
    ${variant === "danger" ? classes.Button__danger : ""}
    ${size === "sm" ? classes.Button__sm : ""}
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
  size?: "sm" | "md";
}

export const Anchor: FC<AnchorProps> = ({
  className,
  variant = "primary",
  size = "sm",
  children,
  ...props
}) => {
  const btnClasses = `
    ${classes.Button}
    ${variant === "primary" ? classes.Button__primary : ""}
    ${variant === "secondary" ? classes.Button__secondary : ""}
    ${variant === "ghost" ? classes.Button__ghost : ""}
    ${variant === "danger" ? classes.Button__danger : ""}
    ${size === "sm" ? classes.Button__sm : ""}
    ${className ? className : ""}
  `;

  return (
    <Link className={btnClasses} {...props}>
      {children}
    </Link>
  );
};

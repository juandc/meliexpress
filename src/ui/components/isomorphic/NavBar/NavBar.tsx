import { type PropsWithChildren, type FC } from "react";
import classes from "./NavBar.module.css";

type Props = PropsWithChildren<{
  className?: string;
  innerContainerClassName?: string;
}>;

export const NavBar: FC<Props> = ({
  children,
  className,
  innerContainerClassName,
}) => {
  const navClasses = `${classes.NavBar} ${className}`;
  const innerContainerClasses = `${classes.NavBar_innerContainer} ${innerContainerClassName}`;

  return (
    <nav className={navClasses}>
      <div className={innerContainerClasses}>
        {children}
      </div>
    </nav>
  );
};

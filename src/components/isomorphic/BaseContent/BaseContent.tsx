import { type PropsWithChildren, type FC, type ReactNode } from "react";
import classes from "./BaseContent.module.css";

type Props = PropsWithChildren<{
  className?: string;
  isEmpty?: boolean;
  breadcrumb?: ReactNode;
  breadcrumbClassName?: ReactNode;
}>;

export const BaseContent: FC<Props> = ({
  children,
  className,
  isEmpty,
  breadcrumb,
  breadcrumbClassName,
}) => {
  const contentClasses = `${classes.BaseContent_content} ${isEmpty && classes.BaseContent_content__isEmpty} ${className}`;
  const breadcrumbClasses = `${classes.BaseContent_breadcrumb} ${breadcrumbClassName}`;
  return (
    <>
      {breadcrumb && (
        <div className={breadcrumbClasses}>
          {breadcrumb}
        </div>
      )}
      <section className={contentClasses}>
        {children}
      </section>
    </>
  );
};

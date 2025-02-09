import { type ReactNode, type FC } from "react";
import type { BaseItem } from "@/types";
import classes from "./SearchResult.module.css";
import Link from "next/link";
import { getItemShortTitle, getItemHref } from "./utils";

type Props = BaseItem & {
  isFirst?: boolean;
  additionalDataEl?: ReactNode;
};

export const SearchResult: FC<Props> = ({
  isFirst = false,
  additionalDataEl,
  ...props
}) => {
  const href = getItemHref(props.title, props.id);
  const mobileTitle = getItemShortTitle(props.title);
  const containerClasses = `${classes.SearchResult} ${isFirst && classes.SearchResult__first}`;

  return (
    <article className={containerClasses}>
      <Link href={href}>
        <figure>
          <img src={props.picture} alt={props.title} />
        </figure>
        <div className={classes.SearchResult_data}>
          <div className={classes.SearchResult_dataPrincipal}>
            <div className={classes.SearchResult_dataPrincipalTop}>
              <p>$ {props.price.amount}</p>
              {/* TODO: use Intl for price format */}
              {props.free_shipping && (
                <img src="/ic_shipping@2x.png" alt="Free Shipping" />
              )}
            </div>
            {/* TODO: hide mobile title for SE(O) */}
            <h2 className={classes.SearchResult_title__mobile}>{mobileTitle}</h2>
            <h2 className={classes.SearchResult_title__desktop}>{props.title}</h2>
          </div>
          <div className={classes.SearchResult_dataSecondary}>
            {additionalDataEl}
            <p>Mendoza ??</p>
          </div>
        </div>
      </Link>
    </article>
  );
};

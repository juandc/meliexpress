import Link from "next/link";
import { type ReactNode, type FC } from "react";
import type { BaseItem } from "@/types";
import { clipItemTitle, getItemHref } from "@/ui/utils/format";
import { Price } from "../Price/Price";
import classes from "./SearchResult.module.css";

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
  const mobileTitle = clipItemTitle(props.title);
  const containerClasses = `${classes.SearchResult} ${isFirst && classes.SearchResult__first}`;

  return (
    <article
      className={containerClasses}
      data-testid="SearchResult"
      id={props.id}
    >
      <Link href={href}>
        <figure>
          <img src={props.picture} alt={props.title} />
        </figure>
        <div className={classes.SearchResult_data}>
          <div className={classes.SearchResult_dataPrincipal}>
            <div className={classes.SearchResult_dataPrincipalTop}>
              <Price {...props.price} />
              {props.free_shipping && (
                <img src="/ic_shipping@2x.png" alt="Free Shipping" />
              )}
            </div>
            <h2 className={classes.SearchResult_title__mobile} data-nosnippet>{mobileTitle}</h2>
            <h2 className={classes.SearchResult_title__desktop}>{props.title}</h2>
          </div>
          <div className={classes.SearchResult_dataSecondary}>
            {additionalDataEl}
            {props.address_state && <p>{props.address_state}</p>}
          </div>
        </div>
      </Link>
    </article>
  );
};

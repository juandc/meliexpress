import { type FC } from "react";
import type { BaseItem } from "@/types";
import classes from "./SearchResult.module.css";
import Link from "next/link";

type Props = BaseItem & {
  isFirst?: boolean;
};

const getItemShortTitle = (title: string, withElipsis: boolean = true, length: number = 56) => {
  if (title.length < length) return title;
  return `${title.slice(0, length)}${withElipsis ? "..." : ""}`;
};

const getItemHref = (title: string, id: string) => {
  let href = "/items/";
  if (title) {
    const shortTitle = getItemShortTitle(title, false, 30).trim();
    const urlTitle = shortTitle.toLowerCase().replaceAll(" ", "-");
    href += encodeURIComponent(urlTitle);
    href += '-';
  }
  href += id;
  return href;
};

export const SearchResult: FC<Props> = ({
  isFirst = false,
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
            Mendoza ??
          </div>
        </div>
      </Link>
    </article>
  );
};

import { type ReactNode, type FC } from "react";
import type { DetailedItem } from "@/types";
import { Button } from "../Button/Button";
import { Price } from "../Price/Price";
import classes from "./ProductDetail.module.css";

type Props = DetailedItem & {
  additionalDataEl?: ReactNode;
};

export const ProductDetail: FC<Props> = ({
  additionalDataEl,
  ...props
}) => {
  return (
    <article id={props.id} className={classes.ProductDetail}>
      <figure className={classes.ProductDetail_picture}>
        <img src={props.picture} alt={props.title} />
      </figure>

      <div className={classes.ProductDetail_data}>
        <p className={classes.ProductDetail_attrs}>
          <span>{props.condition === "new" && "Nuevo"}</span>
          {props.condition === "new" && " - "}
          <span>{props.sold_quantity} vendidos</span>
        </p>
        <h1 className={classes.ProductDetail_title}>{props.title}</h1>
        <Price {...props.price} className={classes.ProductDetail_price} />
        <Button>Comprar</Button>
        {additionalDataEl}
      </div>

      {props.description.length > 0 && (
        <div className={classes.ProductDetail_desc}>
          <h2>Descripción del Producto</h2>
          {/* TODO: markdown */}
          {props.description.split("\n").map((desc, item) => (
            <p key={item}>{desc}</p>
          ))}
        </div>
      )}
    </article>
  );
};

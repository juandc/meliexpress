import { type FC } from "react";
import type { DetailedItem } from "@/types";
import { Button } from "../Button/Button";
import classes from "./ProductDetail.module.css";

export const ProductDetail: FC<DetailedItem> = (props) => {
  return (
    <article id={props.id} className={classes.ProductDetail}>
      <figure className={classes.ProductDetail_picture}>
        <img src={props.picture} alt={props.title} />
      </figure>

      <div className={classes.ProductDetail_data}>
        <p className={classes.ProductDetail_attrs}>
          {/* TODO: props.condition should trasform into... ?? */}
          {props.condition} - {props.sold_quantity} vendidos
        </p>
        <h1 className={classes.ProductDetail_title}>{props.title}</h1>
        {/* TODO: missing decimal styles */}
        <p className={classes.ProductDetail_price}>$ {props.price.amount}</p>
        <Button>Comprar</Button>
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

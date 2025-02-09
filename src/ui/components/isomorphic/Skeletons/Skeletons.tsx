import { type FC } from "react";
import classes from "./Skeletons.module.css";

type SearchResultsSkeletonProps = {
  count: number;
};

export const SearchResultsSkeleton: FC<SearchResultsSkeletonProps> = (props) => (
  <div className={classes.SearchResultsSkeleton}>
    {Array.from({ length: props.count }).map((_, index) => (
      <div
        key={index}
        className={`${classes.Skeleton} ${classes.SearchResultsSkeleton_item}`}
      />
    ))}
  </div>
);

type BreadcrumbSkeletonProps = {
  count: number;
};

export const BreadcrumbSkeleton: FC<BreadcrumbSkeletonProps> = (props) => (
  <div className={classes.BreadcrumbSkeleton}>
    {Array.from({ length: props.count }).map((_, index) => (
      <div
        key={index}
        className={`${classes.Skeleton} ${classes.Skeleton_dark} ${classes.BreadcrumbSkeleton_item}`}
      />
    ))}
  </div>
);

export const ProductDetailsSkeleton: FC = () => (
  <div className={classes.ProductDetailsSkeleton}>
    <div className={`${classes.Skeleton} ${classes.ProductDetailsSkeleton_picture}`} />
    <div className={classes.ProductDetailsSkeleton_data}>
      <div className={`${classes.Skeleton} ${classes.ProductDetailsSkeleton_attrs}`} />
      <div className={`${classes.Skeleton} ${classes.ProductDetailsSkeleton_title}`} />
      <div className={`${classes.Skeleton} ${classes.ProductDetailsSkeleton_btn}`} />
    </div>
  </div>
);

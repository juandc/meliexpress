import { Fragment, type FC } from "react";

type Props = {
  categories: string[];
};

export const Breadcrumb: FC<Props> = ({ categories }) => (
  <p>
    {categories.map((c, i) => (
      <Fragment key={c}>
        {i !== 0 && " > "}
        {(i === categories.length - 1
          ? <b>{c}</b>
          : <span>{c}</span>
        )}
      </Fragment>
    ))}
  </p>
);
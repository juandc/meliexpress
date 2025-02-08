import { ComponentProps, type FC } from "react";
import { InputBar } from "@/ui/components/isomorphic";
import classes from "./SearchBar.module.css";

type InputBarProps = ComponentProps<typeof InputBar>;
type BtnProps = ComponentProps<"button">;

type Props = Omit<InputBarProps, "onChange" | "onClick"> & {
  onInputChange?: InputBarProps["onChange"];
  onInputClick?: InputBarProps["onClick"];
  onBtnClick?: BtnProps["onClick"];
};

export const SearchBar: FC<Props> = ({
  onInputChange,
  onInputClick,
  onBtnClick,
  ...props
}) => (
  <div className={classes.SearchBar}>
    <InputBar
      className={classes.SearchBar_input}
      {...props}
      onChange={onInputChange}
      onClick={onInputClick}
    />
    <button
      type="button"
      className={classes.SearchBar_btn}
      onClick={onBtnClick}
    >
      <img src="/ic_Search@2x.png" alt="Buscar" />
    </button>
  </div>
);

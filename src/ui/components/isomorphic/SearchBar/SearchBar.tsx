/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { type FocusEventHandler, type ComponentProps, type FC } from "react";
import type { BaseItem } from "@/types";
import { InputBar } from "@/ui/components/isomorphic";
import classes from "./SearchBar.module.css";

type InputBarProps = ComponentProps<typeof InputBar>;
type InputOmitProps = "onBlur" | "onChange" | "onClick" | "autoComplete";
type BtnProps = ComponentProps<"button">;

type Props = Omit<InputBarProps, InputOmitProps> & {
  onBlur?: FocusEventHandler<HTMLElement>;
  inputRef?: InputBarProps["ref"];
  onInputBlur?: InputBarProps["onBlur"];
  onInputChange?: InputBarProps["onChange"];
  onInputClick?: InputBarProps["onClick"];
  btnRef?: BtnProps["ref"];
  onBtnBlur?: BtnProps["onBlur"];
  onBtnClick?: BtnProps["onClick"];
  suggestions?: {
    options: string[];
    onSelect?: (option: string) => void;
  };
  preview?: {
    items: BaseItem[];
    onClick?: () => void;
  };
};

export const SearchBar: FC<Props> = ({
  className,
  onBlur,
  inputRef,
  onInputBlur,
  onInputChange,
  onInputClick,
  btnRef,
  onBtnBlur,
  onBtnClick,
  suggestions,
  preview,
  ...props
}) => (
  <div className={`${classes.SearchBar} ${className}`}>
    <InputBar
      className={`
        ${classes.SearchBar_input}
        ${(preview || suggestions) ? classes.SearchBar_input__withBox : ""}
      `}
      {...props}
      autoComplete="off"
      onBlur={e => {
        onBlur?.(e);
        onInputBlur?.(e);
      }}
      onChange={onInputChange}
      onClick={onInputClick}
      ref={inputRef}
    />

    {(preview || suggestions) && (
      <div className={classes.SearchBar_box}>
        {suggestions && (
          <div className={classes.Suggestions}>
            {suggestions.options.map((opt) => (
              <button
                key={opt}
                type="button"
                className={classes.Suggestions_opt}
                onClick={() => suggestions.onSelect?.(opt)}
                data-suggestionopt="true"
                onBlur={onBlur}
              >
                {!props.value && opt}

                {props.value && opt.includes(`${props.value}`) && (
                  <>
                    {opt.slice(0, opt.indexOf(`${props.value}`))}
                    <b>{`${props.value}`}</b>
                    {opt.slice(opt.indexOf(`${props.value}`) + `${props.value}`.length)}
                  </>
                )}
              </button>
            ))}
          </div>
        )}

        {preview && (
          <div className={classes.Preview}>
            {preview.items.map((item, index) => (
              <Link
                key={index}
                className={classes.Preview_item}
                href={`/items/${item.id}`}
                onClick={preview.onClick}
                data-previewitem="true"
              >
                <figure>
                  <img src={item.picture} alt={item.title} />
                </figure>
                <div>
                  <span>{item.title}</span>
                  <span>$ {item.price.amount}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    )}


    <button
      type="button"
      className={`
        ${classes.SearchBar_btn}
        ${(preview || suggestions) ? classes.SearchBar_btn__withBox : ""}
      `}
      onClick={onBtnClick}
      onBlur={e => {
        onBlur?.(e);
        onBtnBlur?.(e);
      }}
      ref={btnRef}
    >
      <img src="/ic_Search@2x.png" alt="Buscar" />
    </button>
  </div>
);

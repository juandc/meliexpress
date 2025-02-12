"use client";

import { type FC } from "react";
import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar: FC = () => (
  <AppProgressBar
    height="4px"
    color="#3483FA"
    options={{ showSpinner: false }}
    shallowRouting
  />
);
import { ENV } from "@/env";

export const isDev = ENV.startsWith("dev");
export const isTest = ENV.startsWith("test");
export const isProd = ENV.startsWith("prod");

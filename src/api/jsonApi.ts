import type { BaseApiError, BaseApiWithData, ErrorApi, BaseApisData } from "@/types";
import { authorMock } from "./mocks/authorMock";

export const jsonData = <T extends BaseApisData>(data: T): BaseApiWithData<T> => ({
  data: {
    author: authorMock,
    ...data,
  },
  error: null,
});

export const jsonError = (error: BaseApiError): ErrorApi => ({
  data: null,
  error,
});

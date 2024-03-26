// import { BaseUrl } from "@/config/url";
import { RootState } from "@/state/store";
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://qt.organogram.app",
  prepareHeaders: async (headers, { getState }) => {
    //console.warn(BaseUrl);
    const token = (getState() as RootState).user.token;
    console.log(token)
    if (token) {
      headers.set("token", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
  }
  return result;
};

export const api = createApi({
  reducerPath: "api",
  refetchOnReconnect: true,
  refetchOnFocus: true,
  keepUnusedDataFor: 60 * 5, //5 minutes state time
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Questions"],
  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Quote {
  id: string;
  title: string;
  content: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    getQuotes: builder.query<Quote[], void>({
      query: () => "quotes",
      transformResponse: (response: any) => response.quotes,
    }),
    deleteQuote: builder.mutation<void, string>({
      query: (id) => ({
        url: `quotes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetQuotesQuery, useDeleteQuoteMutation } =
  api;

// export type { Quote };

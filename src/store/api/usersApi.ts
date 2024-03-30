import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserType } from "../../types";

export const usersApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/users",
  }),
  reducerPath: "usersApi",

  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], void>({ query: () => "" }),

    getSingleUser: builder.query<UserType, number | string>({
      query: (id) => "/" + id,
    }),
  }),
});

export const { getSingleUserLazy } = {
  getSingleUserLazy: usersApi.useLazyGetSingleUserQuery,
};

export const { useGetUsersQuery, useGetSingleUserQuery } = usersApi;

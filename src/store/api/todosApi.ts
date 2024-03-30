import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TodoType } from "../../types";

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/todos",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<TodoType[], void>({
      query: () => "",
    }),

    getSingleTodo: builder.query<TodoType, string | number>({
      query: (todoId) => "/" + todoId,
    }),

    getUserTodos: builder.query<TodoType[], string | number>({
      query: (userId) => "?userId=" + userId,
    }),
  }),
});

export const { getUserTodosLazy } = {
  getUserTodosLazy: todosApi.useLazyGetUserTodosQuery,
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: number;
  title: string;
  key: number;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    login: builder.mutation<any, { username: string; password: string }>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),

    getTodos: builder.query<Todo[], void>({
      query: () => "todos",
      providesTags: ["Todos"],
      transformResponse: (response: { todos: Todo[] }) => response.todos,
    }),

    addTodo: builder.mutation<Todo, { title: string }>({
      query: ({ title }) => ({
        url: "todos/add",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodo: builder.mutation<Todo, { id: number; title: string }>({
      query: ({ id, title }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),

    addUser: builder.mutation<User, Partial<User>>({
      query: (user) => ({
        url: "users/add",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddUserMutation,
} = api;

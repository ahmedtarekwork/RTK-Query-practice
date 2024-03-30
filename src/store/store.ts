import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import { usersApi } from "./api/usersApi";
import { postsApi } from "./api/postsApi";
import { todosApi } from "./api/todosApi";
import { albumApi } from "./api/albumsApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    [albumApi.reducerPath]: albumApi.reducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(todosApi.middleware)
      .concat(albumApi.middleware),
});

export type StateType = ReturnType<typeof store.getState>;

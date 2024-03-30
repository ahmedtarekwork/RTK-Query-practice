import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommentType, PostType } from "../../types";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    // posts
    getPosts: builder.query<PostType[], void>({ query: () => "posts" }),

    getSinglePost: builder.query<PostType, string | number>({
      query: (postId) => "posts/" + postId,
    }),

    getUserPosts: builder.query<PostType[], string | number>({
      query: (userId) => "posts?userId=" + userId,
    }),

    // comments
    getComments: builder.query<CommentType[], void>({
      query: () => "comments",
    }),
    getPostComments: builder.query<CommentType[], string | number>({
      query: (postId) => "comments?postId=" + postId,
    }),
  }),
});

export const {
  // posts \\

  // "single user" posts
  getUserPostsLazy,
  // single post
  getSinglePostLazy,

  // comments \\

  // all comments
  getCommentsLazy,
  // single post comments
  getPostCommentsLazy,
} = {
  // posts
  getUserPostsLazy: postsApi.useLazyGetUserPostsQuery,
  getSinglePostLazy: postsApi.useLazyGetSinglePostQuery,

  // comments
  getCommentsLazy: postsApi.useLazyGetCommentsQuery,
  getPostCommentsLazy: postsApi.useLazyGetPostCommentsQuery,
};

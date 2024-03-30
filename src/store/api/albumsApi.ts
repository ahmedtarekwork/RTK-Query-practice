import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AlbumType, PhotoType } from "../../types";

export const albumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    // albums
    getAlbums: builder.query<AlbumType[], void>({
      query: () => "albums",
    }),

    getSingleAlbum: builder.query<AlbumType, string | number>({
      query: (albumId) => "albums/" + albumId,
    }),

    getUserAlbums: builder.query<AlbumType[], string | number>({
      query: (userId) => "albums?userId" + userId,
    }),

    // photos
    getPhotos: builder.query<PhotoType[], void>({
      query: () => "photos",
    }),

    getSinglePhoto: builder.query<PhotoType, string | number>({
      query: (photoId) => "photos?id=" + photoId,
    }),

    getAlbumPhotos: builder.query<PhotoType[], string | number>({
      query: (AlbumId) => "photos?albumId=" + AlbumId,
    }),
  }),
});

export const {
  // albums
  getUserAlbumsLazy,
  getSingleAlbumLazy,

  // photos
  getAlbumPhotosLazy,
} = {
  getUserAlbumsLazy: albumApi.useLazyGetUserAlbumsQuery,
  getSingleAlbumLazy: albumApi.useLazyGetSingleAlbumQuery,
  getAlbumPhotosLazy: albumApi.useLazyGetAlbumPhotosQuery,
};

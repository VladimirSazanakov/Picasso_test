import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ limit = 5, offset = 0 }) => ({
        url: 'posts',
        params:
        {
          _limit: limit,
          _start: offset,
        }
      })
    }),
    getPost: build.query({
      query: ({ id = 0 }) => ({
        url: `posts/${id}`,
      })
    })

  })
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
} = postsApi;
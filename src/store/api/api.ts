// import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Error = {
  status: number,
  data: {
    message: string
  }
}

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Order", "Reviews"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    
  }) as BaseQueryFn<string | FetchArgs, unknown, Error, {}>,
  endpoints: builder => ({
    getCities: builder.query<string[], void>({
      query: () => "/cities"
    })
  })
})

export const { useGetCitiesQuery } = api;
import { IApartment } from "../../models/IApartment";
import { INewReview } from "../../models/INewReview";
import { api } from "./api";



export const apartmentsEndpoint = api.injectEndpoints({
  endpoints: builder => ({
    getAllApartment: builder.query<IApartment[], void>({
      query: () => "/apartments"
    }),
    getOneApartment: builder.query<IApartment, string>({
      query: (aptId) => ({
        url: `/apartments/${aptId}`
      }),
      providesTags: () => [{
        type: "Reviews"
      }]
    }),
    createNewReview: builder.mutation<any, INewReview>({
      query: ({ aptId, body, token }) => ({
        url: `/apartments/${aptId}/reviews`,
        body: body,
        headers: {
          "authorization": `Bearer ${token}`
        },
        method: "POST"
      }),
      invalidatesTags: () => [{
        type: "Reviews"
      }]
    })
  })
})

export const { useGetAllApartmentQuery, useGetOneApartmentQuery, useCreateNewReviewMutation } = apartmentsEndpoint
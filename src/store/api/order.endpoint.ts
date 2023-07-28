import { IDeleteOrder } from "../../models/IDeleteOrder";
import { IMyOrders } from "../../models/IMyOrders";
import { INewOrder } from "../../models/INewOrder";
import { api } from "./api";

export const orderEndpoint = api.injectEndpoints({
  endpoints: builder => ({
    getOrdders: builder.query<IMyOrders[], string | null>({
      query: (token) => ({
        url: "/orders",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }),
      providesTags: () => [{
        type: 'Order'
      }]
    }),
    addOrder: builder.mutation<{ [key: string]: string }, INewOrder>({
      query: ({ body, token }) => ({
        body: body,
        headers: {
          "authorization": `Bearer ${token}`
        },
        method: "POST",
        url: "/orders"
      }),
      invalidatesTags: () => [{
        type: "Order"
      }]
    }),
    deleteOrder: builder.mutation<{message: string}, IDeleteOrder>({
      query: ({ orderId, token }) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
        headers: {
          "authorization": `Bearer ${token}`
        }
      }),
      invalidatesTags: () => [{
        type: "Order"
      }]
    })
  })
})

export const { useGetOrddersQuery, useAddOrderMutation, useDeleteOrderMutation } = orderEndpoint
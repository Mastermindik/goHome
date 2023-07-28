import { ILogin } from "../../models/ILogin";
import { IRegister } from "../../models/IRegister";
import { IResponse } from "../../models/IResponse";
import { IUser } from "../../models/IUser";
import { api } from "./api";

export const userEndpoint = api.injectEndpoints({
  endpoints: builder => ({
    registerUser: builder.mutation<IResponse, IRegister>({
      query: (body) => ({
        url: "/users/register",
        body,
        method: "POST"
      })
    }),
    loginUser: builder.mutation<IResponse, ILogin>({
      query: (body) => ({
        url: "/users/login",
        body,
        method: "POST"
      })
    }),
    logoutUser: builder.mutation<any, string>({
      query: (token) => ({
        url: "/users/logout",
        method: "POST",
        headers: {
          "authorization": `Bearer ${token}`
        },
      })
    }),
    getUser: builder.query<IUser, string | null>({
      query: (token) => ({
        url: "/users/current",
        headers: {
          "authorization": `Bearer ${token}`
        }
      })
    })
  })
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery } = userEndpoint
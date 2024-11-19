import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetCartAuthorizedHttpClientRequestDto,
  GetCartAuthorizedUrl,
  type GetCartUnauthorizedHttpClientRequestDto,
  GetCartUnauthorizedUrl,
  type PatchCartAuthorizedHttpClientRequestDto,
  PatchCartAuthorizedUrl,
  type PatchCartDataDto,
  type PatchCartParamsDto,
  type PatchCartUnauthorizedHttpClientRequestDto,
  PatchCartUnauthorizedUrl,
  type PatchCartUserAuthorizedHttpClientRequestDto,
  PatchCartUserAuthorizedUrl,
  type PatchCartUserDataDto,
  type PatchCartUserParamsDto,
  type PatchCartUserUnauthorizedHttpClientRequestDto,
  PatchCartUserUnauthorizedUrl,
  PostCartAuthorizedUrl,
  type PostCartAuthorizedUrlHttpClientRequestDto,
  PostCartUnauthorizedUrl,
  type PostCartUnauthorizedUrlHttpClientRequestDto,
} from '@boilerplate/types/carts/dto/requests/carts'
import {
  type GetCartDto,
  type PatchCartResultDto,
  type PatchCartUserDataResultDto,
  type PostCartResultDto,
} from '@boilerplate/types/carts/dto/responses/carts'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getCart: build.query<GetCartDto, { cartId: string; authorized: boolean }>({
      query: ({
        cartId,
        authorized,
      }): GetCartUnauthorizedHttpClientRequestDto | GetCartAuthorizedHttpClientRequestDto => ({
        method: Method.Get,
        url: authorized ? GetCartAuthorizedUrl : GetCartUnauthorizedUrl,
        params: {
          cartId,
        },
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Cart', id }) as const), { type: 'Cart', id: 'LIST' }]
          : [{ type: 'Cart', id: 'LIST' }],
    }),

    postCart: build.mutation<PostCartResultDto, { authorized: boolean }>({
      query: ({
        authorized,
      }): PostCartUnauthorizedUrlHttpClientRequestDto | PostCartAuthorizedUrlHttpClientRequestDto => ({
        method: Method.Post,
        url: authorized ? PostCartAuthorizedUrl : PostCartUnauthorizedUrl,
      }),
      invalidatesTags: [
        { type: 'Cart', id: 'current' },
        { type: 'Cart', id: 'LIST' },
      ],
    }),

    patchCart: build.mutation<PatchCartResultDto, PatchCartParamsDto & PatchCartDataDto & { authorized: boolean }>({
      query: ({
        cartId,
        productId,
        quantity,
        authorized,
      }): PatchCartUnauthorizedHttpClientRequestDto | PatchCartAuthorizedHttpClientRequestDto => ({
        method: Method.Patch,
        url: authorized ? PatchCartAuthorizedUrl : PatchCartUnauthorizedUrl,
        params: {
          cartId,
        },
        data: { productId, quantity },
      }),
      invalidatesTags: (result, error, { cartId }) => [
        { type: 'Cart', id: 'current' },
        { type: 'Cart', id: cartId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),

    patchCartUserData: build.mutation<
      PatchCartUserDataResultDto,
      PatchCartUserParamsDto & PatchCartUserDataDto & { authorized: boolean }
    >({
      query: ({
        cartId,
        authorized,
        firstName,
        lastName,
        phone,
        email,
        city,
        department,
        // paymentType,
      }): PatchCartUserUnauthorizedHttpClientRequestDto | PatchCartUserAuthorizedHttpClientRequestDto => ({
        method: Method.Patch,
        url: authorized ? PatchCartUserAuthorizedUrl : PatchCartUserUnauthorizedUrl,
        params: {
          cartId,
        },
        data: { firstName, lastName, phone, email, city, department },
      }),
      invalidatesTags: (result, error, { cartId }) => [
        { type: 'Cart', id: 'current' },
        { type: 'Cart', id: cartId },
        { type: 'Cart', id: 'LIST' },
      ],
    }),
  }),
})

export const { useGetCartQuery, usePostCartMutation, usePatchCartMutation, usePatchCartUserDataMutation } = api

export const { getCart, postCart, patchCart, patchCartUserData } = api.endpoints

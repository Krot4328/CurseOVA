/* eslint-disable prettier/prettier */
import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetUserCartsListHttpClientRequestDto,
  GetUserCartsListUrl,
} from '@boilerplate/types/carts/dto/requests/carts'
import { type GetUserCartsListDto } from '@boilerplate/types/carts/dto/responses/carts'

import { v1ReactApi } from '@boilerplate/front-end/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getUserCartsList: build.query<GetUserCartsListDto[], void>({
      query: (): GetUserCartsListHttpClientRequestDto => ({
        method: Method.Get,
        url: GetUserCartsListUrl,
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
            ...result.flatMap((cart) =>
              cart.items
                .filter((item) => item.product !== null)
                .map((item) => ({ type: 'Cart', id: item.product!.id }) as const),
            ),
            { type: 'Cart', id: 'LIST' },
          ]
          : [{ type: 'Cart', id: 'LIST' }],
    }),
  }),
})

export const { useGetUserCartsListQuery } = api

export const { getUserCartsList } = api.endpoints

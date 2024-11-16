import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetProductsHttpClientRequestDto,
  GetProductsListUrl,
} from '@boilerplate/types/products/dto/requests/products'
import { type GetProductShortDto } from '@boilerplate/types/products/dto/responses/products'

import { v1Api } from '@boilerplate/dashboard/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<GetProductShortDto[], void>({
      query: (): GetProductsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductsListUrl,
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Product', id }) as const), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const { useGetProductsQuery } = api

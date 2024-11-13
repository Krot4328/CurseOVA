import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetProductsHttpClientRequestDto,
  GetProductsListUrl,
} from '@boilerplate/types/products/dto/requests/products'
import { type GetProductDataDto } from '@boilerplate/types/products/dto/responses/products'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<GetProductDataDto[], void>({
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

import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetProductHttpClientRequestDto,
  GetProductUrl,
  type GetProductsHttpClientRequestDto,
  GetProductsListUrl,
  type GetProductsSearchDto,
} from '@boilerplate/types/products/dto/requests/products'
import {
  type GetProductDto,
  type GetProductShortDto,
  type GetProductsHttpListResponseDto,
} from '@boilerplate/types/products/dto/responses/products'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getProductsList: build.query<GetProductsHttpListResponseDto, Required<GetProductsSearchDto>>({
      query: (search): GetProductsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductsListUrl,
        search,
      }),
      transformResponse(data: GetProductShortDto[], meta: { total: number }): GetProductsHttpListResponseDto {
        return {
          result: data,
          total: meta?.total,
        }
      },
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Product', id }) as const), { type: 'Product', id: 'LIST' }]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    getProduct: build.query<GetProductDto, string>({
      query: (productId: string): GetProductHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductUrl,
        params: {
          productId,
        },
      }),
      providesTags: (result) => [{ type: 'Product', id: result?.id } as const],
    }),
  }),
})

export const { useGetProductsListQuery, useGetProductQuery } = api

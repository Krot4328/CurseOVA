import { Method } from '@boilerplate/core/interfaces/http'

import {
  type DeleteProductHttpClientRequestDto,
  type DeleteProductParamsDto,
  DeleteProductUrl,
  type GetProductHttpClientRequestDto,
  type GetProductParamsDto,
  GetProductUrl,
  type GetProductsHttpClientRequestDto,
  GetProductsListUrl,
  type GetProductsSearchDto,
  type PatchProductDataDto,
  type PatchProductHttpClientRequestDto,
  type PatchProductParamsDto,
  PatchProductUrl,
  type PostProductDataDto,
  type PostProductHttpClientRequestDto,
  PostProductUrl,
} from '@boilerplate/types/products/dto/requests/products'
import {
  type DeleteProductResultDto,
  type GetProductDto,
  type GetProductShortDto,
  type GetProductsHttpListResponseDto,
  type PatchProductResultDto,
  type PostProductResultDto,
} from '@boilerplate/types/products/dto/responses/products'

import { v1Api } from '@boilerplate/dashboard/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getProductsList: build.query<GetProductsHttpListResponseDto, Required<GetProductsSearchDto>>({
      query: ({ search, page, pageSize, tagsIds }): GetProductsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductsListUrl,
        search: {
          search,
          page,
          pageSize,
          tagsIds,
        },
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

    getProduct: build.query<GetProductDto, GetProductParamsDto>({
      query: ({ productId }): GetProductHttpClientRequestDto => ({
        method: Method.Get,
        url: GetProductUrl,
        params: {
          productId,
        },
      }),
      providesTags: (result) => [{ type: 'Product', id: result?.id } as const],
    }),

    postProduct: build.mutation<PostProductResultDto, PostProductDataDto>({
      query: ({ title, description, price, tagsIds, imagesIds }): PostProductHttpClientRequestDto => ({
        method: Method.Post,
        url: PostProductUrl,
        data: {
          title,
          description,
          price,
          tagsIds,
          imagesIds,
        },
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    patchProduct: build.mutation<PatchProductResultDto, PatchProductParamsDto & PatchProductDataDto>({
      query: ({ productId, title, description, price, tagsIds, imagesIds }): PatchProductHttpClientRequestDto => ({
        method: Method.Patch,
        url: PatchProductUrl,
        params: {
          productId,
        },
        data: {
          title,
          description,
          price,
          tagsIds,
          imagesIds,
        },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: 'current' },
        { type: 'Product', id: productId },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    deleteProduct: build.mutation<DeleteProductResultDto, DeleteProductParamsDto>({
      query: ({ productId }): DeleteProductHttpClientRequestDto => ({
        method: Method.Delete,
        url: DeleteProductUrl,
        params: {
          productId,
        },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: 'Product', id: 'current' },
        { type: 'Product', id: productId },
        { type: 'Product', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetProductQuery,
  useGetProductsListQuery,

  usePostProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} = api

export const { getProductsList, getProduct, postProduct, patchProduct, deleteProduct } = api.endpoints

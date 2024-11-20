import { Method } from '@boilerplate/core/interfaces/http'

import {
  // type DeleteCartHttpClientRequestDto,
  // type DeleteCartParamsDto,
  // DeleteCartUrl,
  // type GetCartHttpClientRequestDto,
  // type GetCartParamsDto,
  // GetCartUrl,
  type GetCartsHttpClientRequestDto,
  GetCartsListUrl,
  type GetCartsSearchDto,
  // type PatchCartDataDto,
  // type PatchCartHttpClientRequestDto,
  // type PatchCartParamsDto,
  // PatchCartUrl,
  // type PostCartDataDto,
  // type PostCartHttpClientRequestDto,
  // PostCartUrl,
} from '@boilerplate/types/carts/dto/requests/carts'
import {
  // type DeleteCartResultDto,
  // type GetCartDto,
  type GetCartDto,
  type GetCartsHttpListResponseDto,
  // type PatchCartResultDto,
  // type PostCartResultDto,
} from '@boilerplate/types/carts/dto/responses/carts'

import { v1Api } from '@boilerplate/dashboard/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getCartsList: build.query<GetCartsHttpListResponseDto, Required<GetCartsSearchDto>>({
      query: ({ page, pageSize }): GetCartsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetCartsListUrl,
        search: {
          page,
          pageSize,
        },
      }),
      transformResponse(data: GetCartDto[], meta: { total: number }): GetCartsHttpListResponseDto {
        return {
          result: data,
          total: meta?.total,
        }
      },
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Cart', id }) as const), { type: 'Cart', id: 'LIST' }]
          : [{ type: 'Cart', id: 'LIST' }],
    }),

    // getCart: build.query<GetCartDto, GetCartParamsDto>({
    //   query: ({ cartId }): GetCartHttpClientRequestDto => ({
    //     method: Method.Get,
    //     url: GetCartUrl,
    //     params: {
    //       cartId,
    //     },
    //   }),
    //   providesTags: (result) => [{ type: 'Cart', id: result?.id } as const],
    // }),

    // postCart: build.mutation<PostCartResultDto, PostCartDataDto>({
    //   query: ({ title, description, price, tagsIds, imagesIds }): PostCartHttpClientRequestDto => ({
    //     method: Method.Post,
    //     url: PostCartUrl,
    //     data: {
    //       title,
    //       description,
    //       price,
    //       tagsIds,
    //       imagesIds,
    //     },
    //   }),
    //   invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    // }),

    // patchCart: build.mutation<PatchCartResultDto, PatchCartParamsDto & PatchCartDataDto>({
    //   query: ({ cartId, title, description, price, tagsIds, imagesIds }): PatchCartHttpClientRequestDto => ({
    //     method: Method.Patch,
    //     url: PatchCartUrl,
    //     params: {
    //       cartId,
    //     },
    //     data: {
    //       title,
    //       description,
    //       price,
    //       tagsIds,
    //       imagesIds,
    //     },
    //   }),
    //   invalidatesTags: (result, error, { cartId }) => [
    //     { type: 'Cart', id: 'current' },
    //     { type: 'Cart', id: cartId },
    //     { type: 'Cart', id: 'LIST' },
    //   ],
    // }),

    // deleteCart: build.mutation<DeleteCartResultDto, DeleteCartParamsDto>({
    //   query: ({ cartId }): DeleteCartHttpClientRequestDto => ({
    //     method: Method.Delete,
    //     url: DeleteCartUrl,
    //     params: {
    //       cartId,
    //     },
    //   }),
    //   invalidatesTags: (result, error, { cartId }) => [
    //     { type: 'Cart', id: 'current' },
    //     { type: 'Cart', id: cartId },
    //     { type: 'Cart', id: 'LIST' },
    //   ],
    // }),
  }),
})

export const {
  // useGetCartQuery,
  useGetCartsListQuery,

  // usePostCartMutation,
  // usePatchCartMutation,
  // useDeleteCartMutation,
} = api

export const {
  getCartsList,
  // getCart,
  // postCart,
  // patchCart,
  // deleteCart,
} = api.endpoints

import { Method } from '@boilerplate/core/interfaces/http'

import {
  type PostProductDataDto,
  type PostProductHttpClientRequestDto,
  PostProductUrl,
} from '@boilerplate/types/products/dto/requests/products'
import { type PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { v1ReactApi } from '@boilerplate/dashboard/store/api/v1.api/react.api'

const api = v1ReactApi.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation<PostProductResultDto, FormData>({
      query: (formData): PostProductHttpClientRequestDto => ({
        method: Method.Post,
        url: PostProductUrl,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      }),
    }),
    delete: build.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        method: Method.Delete,
        url: `/products/${productId}`,
      })
    })
  }),
})

export const { create, delete: deleteProduct } = api.endpoints
export const { useDeleteMutation } = api

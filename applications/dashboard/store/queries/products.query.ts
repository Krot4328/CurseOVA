import { Method } from '@boilerplate/core/interfaces/http'

import {
  DeleteProductUrl,
  type PostProductDataDto,
  type PostProductHttpClientRequestDto,
  PostProductUrl,
} from '@boilerplate/types/products/dto/requests/products'
import { type PostProductResultDto } from '@boilerplate/types/products/dto/responses/products'

import { v1Api } from '@boilerplate/dashboard/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation<PostProductResultDto, PostProductDataDto>({
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
    deleteProduct: build.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        method: Method.Delete,
        url: DeleteProductUrl,
        params: {
          productId,
        },
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
})

export const { create, deleteProduct } = api.endpoints

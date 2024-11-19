import { Method } from '@boilerplate/core/interfaces/http'

import {
  type GetReferenceTagsHttpClientRequestDto,
  GetReferenceTagsUrl,
} from '@boilerplate/types/reference/dto/requests/reference'
import {
  type GetReferenceTagsHttpListResponseDto,
  type ReferenceTagsMapDto,
} from '@boilerplate/types/reference/dto/responses/reference'

import { v1Api } from '@boilerplate/front-end/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    getTagsList: build.query<GetReferenceTagsHttpListResponseDto, void>({
      query: (): GetReferenceTagsHttpClientRequestDto => ({
        method: Method.Get,
        url: GetReferenceTagsUrl,
      }),
      transformResponse(data: ReferenceTagsMapDto[], meta: { total: number }): GetReferenceTagsHttpListResponseDto {
        return {
          result: data,
          total: meta?.total,
        }
      },
      providesTags: (result) =>
        Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Tag', id }) as const), { type: 'Tag', id: 'LIST' }]
          : [{ type: 'Tag', id: 'LIST' }],
    }),
  }),
})

export const { useGetTagsListQuery } = api

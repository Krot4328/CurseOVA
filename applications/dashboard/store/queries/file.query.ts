import { Method } from '@boilerplate/core/interfaces/http'

import {
  type PostFilePreloadRequestHttpClientRequestDto,
  PostFilePreloadRequestUrl,
} from '@boilerplate/types/files/dto/requests/files'
import { type PostFilePreloadResultDto } from '@boilerplate/types/files/dto/responses/files'

import { v1Api } from '@boilerplate/dashboard/store/api/v1.api'

const api = v1Api.injectEndpoints({
  endpoints: (build) => ({
    postFilePreload: build.mutation<PostFilePreloadResultDto, File>({
      query: (file): PostFilePreloadRequestHttpClientRequestDto => {
        const formData = new FormData()

        formData.append('file', file)

        return {
          method: Method.Post,
          url: PostFilePreloadRequestUrl,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        }
      },
    }),
  }),
})

export const { usePostFilePreloadMutation } = api

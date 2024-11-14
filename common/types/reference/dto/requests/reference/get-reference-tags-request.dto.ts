import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const GetReferenceTagsUrl = '/reference/tags'

export class GetReferenceTagsHttpServerRequestDto extends HttpServerRequestDto<typeof GetReferenceTagsUrl> {
  readonly method = Method.Get

  readonly url = GetReferenceTagsUrl
}

export class GetReferenceTagsHttpClientRequestDto extends HttpClientRequestDto<typeof GetReferenceTagsUrl> {
  readonly method = Method.Get

  readonly url = GetReferenceTagsUrl
}

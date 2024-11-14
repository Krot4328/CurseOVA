import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'

import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const PostFilePreloadRequestUrl = '/files'

export class PostFilePreloadRequestHttpServerRequestDto extends HttpServerRequestDto<typeof PostFilePreloadRequestUrl> {
  readonly method = Method.Post

  readonly url = PostFilePreloadRequestUrl
}

export class PostFilePreloadRequestHttpClientRequestDto extends HttpClientRequestDto<
  typeof PostFilePreloadRequestUrl,
  FormData
> {
  readonly method = Method.Post

  readonly url = PostFilePreloadRequestUrl

  @ValidateNested()
  @Type(() => FormData)
  data: FormData
}

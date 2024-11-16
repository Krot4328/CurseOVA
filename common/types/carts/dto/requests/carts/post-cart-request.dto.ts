import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const PostCartUnauthorizedUrl = '/carts'

export const PostCartAuthorizedUrl = '/carts/user'

export class PostCartUnauthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<typeof PostCartUnauthorizedUrl> {
  readonly method = Method.Post

  readonly url = PostCartUnauthorizedUrl
}

export class PostCartUnauthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<typeof PostCartUnauthorizedUrl> {
  readonly method = Method.Post

  readonly url = PostCartUnauthorizedUrl
}

export class PostCartAuthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<typeof PostCartAuthorizedUrl> {
  readonly method = Method.Post

  readonly url = PostCartAuthorizedUrl
}

export class PostCartAuthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<typeof PostCartAuthorizedUrl> {
  readonly method = Method.Post

  readonly url = PostCartAuthorizedUrl
}

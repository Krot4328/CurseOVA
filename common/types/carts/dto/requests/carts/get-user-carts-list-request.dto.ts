import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method } from '@boilerplate/core/interfaces/http'

export const GetUserCartsListUrl = '/user-carts'

export class GetUserCartsListHttpServerRequestDto extends HttpServerRequestDto<typeof GetUserCartsListUrl> {
  readonly method = Method.Get

  readonly url = GetUserCartsListUrl
}

export class GetUserCartsListHttpClientRequestDto extends HttpClientRequestDto<typeof GetUserCartsListUrl> {
  readonly method = Method.Get

  readonly url = GetUserCartsListUrl
}

import { IsUUID } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

export const GetCartUnauthorizedUrl = '/carts/:cartId'

export const GetCartAuthorizedUrl = '/carts/user/:cartId'

export const GetCartAdminUrl = '/carts/admin/:cartId'

export class GetCartParamsDto
  implements Params<typeof GetCartUnauthorizedUrl | typeof GetCartAuthorizedUrl | typeof GetCartAdminUrl>
{
  readonly [x: string]: string | number

  @HttpRequestFieldDecorator()
  @IsUUID(4)
  cartId: string
}

export class GetCartUnauthorizedHttpServerRequestDto extends HttpServerRequestDto<typeof GetCartUnauthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetCartUnauthorizedUrl
}

export class GetCartUnauthorizedHttpClientRequestDto extends HttpClientRequestDto<typeof GetCartUnauthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetCartUnauthorizedUrl
}

export class GetCartAuthorizedHttpServerRequestDto extends HttpServerRequestDto<typeof GetCartAuthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetCartAuthorizedUrl
}

export class GetCartAuthorizedHttpClientRequestDto extends HttpClientRequestDto<typeof GetCartAuthorizedUrl> {
  readonly method = Method.Get

  readonly url = GetCartAuthorizedUrl
}

export class GetCartAdminHttpServerRequestDto extends HttpServerRequestDto<typeof GetCartAdminUrl> {
  readonly method = Method.Get

  readonly url = GetCartAdminUrl
}

export class GetCartAdminHttpClientRequestDto extends HttpClientRequestDto<typeof GetCartAdminUrl> {
  readonly method = Method.Get

  readonly url = GetCartAdminUrl
}

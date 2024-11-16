import { IsUUID } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

export const GetProductUrl = '/products/:productId'

export class GetProductParamsDto implements Params<typeof GetProductUrl> {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  productId: string
}

export class GetProductHttpServerRequestDto extends HttpServerRequestDto<typeof GetProductUrl> {
  readonly method = Method.Get

  readonly url = GetProductUrl
}

export class GetProductHttpClientRequestDto extends HttpClientRequestDto<typeof GetProductUrl> {
  readonly method = Method.Get

  readonly url = GetProductUrl
}

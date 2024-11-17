import { Type } from 'class-transformer'
import { IsUUID, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, type Params } from '@boilerplate/core/interfaces/http'

export const DeleteProductUrl = '/products/:productId'

export class DeleteProductParamsDto implements Params<typeof DeleteProductUrl> {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  productId: string
}

export class DeleteProductHttpServerRequestDto extends HttpServerRequestDto<typeof DeleteProductUrl> {
  readonly method = Method.Delete

  readonly url = DeleteProductUrl

  @ValidateNested()
  @Type(() => DeleteProductParamsDto)
  params: DeleteProductParamsDto
}

export class DeleteProductHttpClientRequestDto extends HttpClientRequestDto<typeof DeleteProductUrl> {
  readonly method = Method.Delete

  readonly url = DeleteProductUrl

  @ValidateNested()
  @Type(() => DeleteProductParamsDto)
  params: DeleteProductParamsDto
}

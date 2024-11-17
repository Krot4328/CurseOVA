import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsUUID, Min, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

import { type PatchCartData } from '@boilerplate/types/carts/interfaces/carts'

export const PatchCartUnauthorizedUrl = '/carts/:cartId'

export const PatchCartAuthorizedUrl = '/carts/user/:cartId'

export const PatchCartAdminUrl = '/carts/admin/:cartId'

export class PatchCartParamsDto
  implements Params<typeof PatchCartUnauthorizedUrl | typeof PatchCartAuthorizedUrl | typeof PatchCartAdminUrl>
{
  readonly [x: string]: string | number

  @HttpRequestFieldDecorator()
  @IsUUID(4)
  cartId: string
}

export class PatchCartDataDto implements PatchCartData {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  productId: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number
}

export class PatchCartUnauthorizedHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchCartUnauthorizedUrl,
  PatchCartDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartDataDto)
  readonly data: PatchCartDataDto
}

export class PatchCartUnauthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchCartUnauthorizedUrl,
  PatchCartDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartDataDto)
  readonly data: PatchCartDataDto
}

export class PatchCartAuthorizedHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchCartAuthorizedUrl,
  PatchCartDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartDataDto)
  readonly data: PatchCartDataDto
}

export class PatchCartAuthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchCartAuthorizedUrl,
  PatchCartDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartDataDto)
  readonly data: PatchCartDataDto
}

export class PatchCartAdminHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchCartAdminUrl,
  PatchCartDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartAdminUrl

  @ValidateNested()
  @Type(() => PatchCartDataDto)
  readonly data: PatchCartDataDto
}

export class PatchCartAdminHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchCartAdminUrl,
  PatchCartDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartAdminUrl

  @ValidateNested()
  @Type(() => PatchCartDataDto)
  readonly data: PatchCartDataDto
}

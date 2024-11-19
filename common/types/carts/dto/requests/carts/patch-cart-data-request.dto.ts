import { Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { Method, Params } from '@boilerplate/core/interfaces/http'

import { PatchCartUserData } from '@boilerplate/types/carts/interfaces/carts'

export const PatchCartUserUnauthorizedUrl = '/cart-user-data/:cartId'

export const PatchCartUserAuthorizedUrl = '/cart-user-data/user/:cartId'

export class PatchCartUserParamsDto
  // eslint-disable-next-line prettier/prettier
  implements Params<typeof PatchCartUserUnauthorizedUrl | typeof PatchCartUserAuthorizedUrl> {
  @HttpRequestFieldDecorator()
  @IsUUID(4)
  cartId: string
}

export class PatchCartUserDataDto implements PatchCartUserData {
  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  firstName?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  lastName?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  phone?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  email?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  city?: string

  @HttpRequestFieldDecorator()
  @IsOptional()
  @IsString()
  department?: string
}

export class PatchCartUserDataUnauthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchCartUserUnauthorizedUrl,
  PatchCartUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartUserUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartUserDataDto)
  readonly data: PatchCartUserDataDto
}

export class PatchCartUserUnauthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchCartUserUnauthorizedUrl,
  PatchCartUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartUserUnauthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartUserDataDto)
  readonly data: PatchCartUserDataDto
}

export class PatchCartUserAuthorizedHttpServerRequestDto extends HttpServerRequestDto<
  typeof PatchCartUserAuthorizedUrl,
  PatchCartUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartUserAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartUserDataDto)
  readonly data: PatchCartUserDataDto
}

export class PatchCartUserAuthorizedHttpClientRequestDto extends HttpClientRequestDto<
  typeof PatchCartUserAuthorizedUrl,
  PatchCartUserDataDto
> {
  readonly method = Method.Patch

  readonly url = PatchCartUserAuthorizedUrl

  @ValidateNested()
  @Type(() => PatchCartUserDataDto)
  readonly data: PatchCartUserDataDto
}

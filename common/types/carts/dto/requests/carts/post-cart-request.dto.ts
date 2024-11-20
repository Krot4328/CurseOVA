import { Type } from 'class-transformer'
import { IsBoolean, ValidateNested } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'
import { HttpClientRequestDto } from '@boilerplate/core/dto/requests/http-client-request.dto'
import { HttpServerRequestDto } from '@boilerplate/core/dto/requests/http-server-request.dto'
import { HttpRequestFieldCast, Method } from '@boilerplate/core/interfaces/http'

import { type PostCartData } from '@boilerplate/types/carts/interfaces/carts'

export const PostCartUnauthorizedUrl = '/carts'

export const PostCartAuthorizedUrl = '/carts/user'

export class PostCartDataDto implements PostCartData {
  @HttpRequestFieldDecorator({ cast: HttpRequestFieldCast.Boolean, defaultValue: false })
  @IsBoolean()
  force: boolean
}

export class PostCartUnauthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<
  typeof PostCartUnauthorizedUrl,
  PostCartDataDto
> {
  readonly method = Method.Post

  readonly url = PostCartUnauthorizedUrl

  @ValidateNested()
  @Type(() => PostCartDataDto)
  data: PostCartDataDto
}

export class PostCartUnauthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<
  typeof PostCartUnauthorizedUrl,
  PostCartDataDto
> {
  readonly method = Method.Post

  readonly url = PostCartUnauthorizedUrl

  @ValidateNested()
  @Type(() => PostCartDataDto)
  data: PostCartDataDto
}

export class PostCartAuthorizedUrlHttpServerRequestDto extends HttpServerRequestDto<
  typeof PostCartAuthorizedUrl,
  PostCartDataDto
> {
  readonly method = Method.Post

  readonly url = PostCartAuthorizedUrl

  @ValidateNested()
  @Type(() => PostCartDataDto)
  data: PostCartDataDto
}

export class PostCartAuthorizedUrlHttpClientRequestDto extends HttpClientRequestDto<
  typeof PostCartAuthorizedUrl,
  PostCartDataDto
> {
  readonly method = Method.Post

  readonly url = PostCartAuthorizedUrl

  @ValidateNested()
  @Type(() => PostCartDataDto)
  data: PostCartDataDto
}

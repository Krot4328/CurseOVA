/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Logger, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { JwtPassportAuthGuard } from 'src/modules/auth/guards/jwt-passport.guard'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  GetCartAdminHttpServerRequestDto,
  GetCartAdminUrl,
  GetCartAuthorizedHttpServerRequestDto,
  GetCartAuthorizedUrl,
  GetCartUnauthorizedUrl,
  GetCartsListUrl,
  GetCartsSearchDto,
  PatchCartAdminHttpServerRequestDto,
  PatchCartAdminUrl,
  PatchCartAuthorizedHttpServerRequestDto,
  PatchCartAuthorizedUrl,
  PatchCartDataDto,
  PatchCartUnauthorizedUrl,
  PatchCartUserAuthorizedUrl,
  PatchCartUserDataDto,
  PatchCartUserUnauthorizedUrl,
  PostCartAuthorizedUrl,
  PostCartAuthorizedUrlHttpServerRequestDto,
  PostCartDataDto,
  PostCartUnauthorizedUrl,
} from '@boilerplate/types/carts/dto/requests/carts'
import {
  GetCartHttpResponseDto,
  GetCartsHttpListResponseDto,
  PatchCartResultHttpResponseDto,
  PostCartResultHttpResponseDto,
} from '@boilerplate/types/carts/dto/responses/carts'

import { CartsService } from '@boilerplate/back-end/modules/carts/services/carts.service'

@Controller()
@ApiTags('Carts')
export class CartsController {
  private readonly logger = new Logger(CartsController.name)

  constructor(private readonly cartsService: CartsService) { }

  @Get(GetCartsListUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.Admin])
  async getCartList(@Query() queries: GetCartsSearchDto): Promise<GetCartsHttpListResponseDto> {
    const { page, pageSize } = queries

    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.getCartList`,
      queries: {
        page,
        pageSize,
      },
    })

    return await this.cartsService.getCartsList({ page, pageSize })
  }

  @Post(PostCartUnauthorizedUrl)
  async postCartUnauthorized(): Promise<PostCartResultHttpResponseDto> {
    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.postCartUnauthorized`,
    })

    return await this.cartsService.postCart()
  }

  @Post(PostCartAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async postCart(
    @Request() request: PostCartAuthorizedUrlHttpServerRequestDto,
    @Body() body: PostCartDataDto,
  ): Promise<PostCartResultHttpResponseDto> {
    const {
      user: { gid: userGid },
    } = request
    const { force } = body

    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.postCart`,
      body: {
        force,
      }
    })

    return await this.cartsService.postCart(userGid, force)
  }

  @Get(GetCartUnauthorizedUrl)
  async getCartUnauthorized(@Param('cartId') cartId: string): Promise<GetCartHttpResponseDto> {
    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.getCartUnauthorized`,
      params: {
        cartId,
      },
    })

    return await this.cartsService.getCart(cartId)
  }

  @Get(GetCartAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async getCartAuthorized(
    @Request() request: GetCartAuthorizedHttpServerRequestDto,
    @Param('cartId') cartId: string,
  ): Promise<GetCartHttpResponseDto> {
    const {
      user: { gid: userGid },
    } = request

    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.getCartAuthorized`,
      params: {
        cartId,
      },
    })

    return await this.cartsService.getCart(cartId, userGid)
  }

  @Get(GetCartAdminUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async getCartAdmin(
    @Request() request: GetCartAdminHttpServerRequestDto,
    @Param('cartId') cartId: string,
  ): Promise<GetCartHttpResponseDto> {
    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.getCartAdmin`,
      params: {
        cartId,
      },
    })

    return await this.cartsService.getCart(cartId, 'all')
  }

  @Patch(PatchCartUnauthorizedUrl)
  async patchCartUnauthorized(
    @Param('cartId') cartId: string,
    @Body() body: PatchCartDataDto,
  ): Promise<PatchCartResultHttpResponseDto> {
    const { productId, quantity } = body

    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.patchCartUnauthorized`,
      params: {
        cartId,
      },
    })

    return await this.cartsService.patchCart(cartId, { productId, quantity })
  }

  @Patch(PatchCartAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async patchCartAuthorized(
    @Request() request: PatchCartAuthorizedHttpServerRequestDto,
    @Param('cartId') cartId: string,
    @Body() body: PatchCartDataDto,
  ): Promise<PatchCartResultHttpResponseDto> {
    const {
      user: { gid: userGid },
    } = request
    const { productId, quantity } = body

    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.patchCartAuthorized`,
      params: {
        cartId,
      },
    })

    return await this.cartsService.patchCart(cartId, { productId, quantity }, userGid)
  }

  @Patch(PatchCartAdminUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async patchCartAdmin(
    @Request() request: PatchCartAdminHttpServerRequestDto,
    @Param('cartId') cartId: string,
    @Body() body: PatchCartDataDto,
  ): Promise<PatchCartResultHttpResponseDto> {
    const { productId, quantity } = body

    this.logger.log({
      controller: CartsController.name,
      action: `${CartsController.name}.patchCartAdmin`,
      params: {
        cartId,
      },
    })

    return await this.cartsService.patchCart(cartId, { productId, quantity }, 'all')
  }

  @Patch(PatchCartUserUnauthorizedUrl)
  async patchCartUserUnauthorized(
    @Param('cartId') cartId: string,
    @Body() data: PatchCartUserDataDto,
  ): Promise<PatchCartResultHttpResponseDto> {
    const { firstName, lastName, email, phone, city, department } = data

    return await this.cartsService.patchCartUserData(cartId, { firstName, lastName, email, phone, city, department })
  }

  @Patch(PatchCartUserAuthorizedUrl)
  @ApiBearerAuth()
  @UseGuards(JwtPassportAuthGuard)
  @Roles([Role.User])
  async patchCartUserAuthorized(
    @Request() request: PatchCartAuthorizedHttpServerRequestDto,
    @Param('cartId') cartId: string,
    @Body() data: PatchCartUserDataDto,
  ): Promise<PatchCartResultHttpResponseDto> {
    const { firstName, lastName, email, phone, city, department } = data
    const {
      user: { gid: userGid },
    } = request

    return await this.cartsService.patchCartUserData(
      cartId,
      { firstName, lastName, email, phone, city, department },
      userGid,
    )
  }
}

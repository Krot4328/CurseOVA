/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'

import { HttpListServerResponse, HttpServerResponse } from '@boilerplate/core/interfaces/http'

import {
  GetCart,
  GetCartsSearch,
  PatchCartData,
  PatchCartResult,
  PatchCartUserData,
  PatchCartUserDataResult,
  PostCartResult,
  StatusType,
} from '@boilerplate/types/carts/interfaces/carts'

import { CartsRepository } from '@boilerplate/back-end/modules/carts/repositories/carts.repository'

import { CartsDataMapper } from '@boilerplate/back-end/modules/carts/data-mappers/carts.data-mapper'

@Injectable()
export class CartsService {
  constructor(
    private readonly cartsRepository: CartsRepository,

    private readonly cartsDataMapper: CartsDataMapper,
  ) { }

  async getCartsList(queries: GetCartsSearch): Promise<HttpListServerResponse<GetCart>> {
    const page = parseInt(`${queries.page ?? 0}`, 10)
    const pageSize = parseInt(`${queries.pageSize ?? 10}`, 10)

    const [carts, total] = await this.cartsRepository.findCartsAndCount({
      page,
      pageSize,
    })

    return {
      result: carts.map((cart) => this.cartsDataMapper.toCart(cart)),
      total,
    }
  }

  async postCart(userGid?: string): Promise<HttpServerResponse<PostCartResult>> {
    const cart = await this.cartsRepository.save({ userGid })

    const result: PostCartResult = {
      cartId: cart.id,
      isSuccess: true,
    }

    return { result }
  }

  async getCart(id?: string, userGid?: string | 'all'): Promise<HttpServerResponse<GetCart>> {
    const cart = await this.cartsRepository.findCartOneOrFail(id, userGid)

    return {
      result: this.cartsDataMapper.toCart(cart),
    }
  }

  async patchCart(
    id: string,
    data: PatchCartData,
    userGid?: string | 'all',
  ): Promise<HttpServerResponse<PatchCartResult>> {
    const { productId, quantity } = data

    await this.cartsRepository.findCartOneOrFail(id, userGid)

    await this.cartsRepository.setProduct(id, productId, quantity)

    const result: PatchCartResult = {
      isSuccess: true,
    }

    return { result }
  }

  async patchCartUserData(
    id: string,
    data: PatchCartUserData,
    userGid?: string | 'all',
  ): Promise<HttpServerResponse<PatchCartUserDataResult>> {
    const { firstName, lastName, email, phone, city, department } = data

    const cart = await this.cartsRepository.findCartOneOrFail(id, userGid)

    cart.firstName = firstName || ''
    cart.lastName = lastName || ''
    cart.email = email || ''
    cart.phone = phone || ''
    cart.city = city || ''
    cart.department = department || ''

    cart.paymentStatus = StatusType.Processing

    await this.cartsRepository.save(cart)

    const result: PatchCartUserDataResult = {
      isSuccess: true,
    }

    return {
      result,
    }
  }
}

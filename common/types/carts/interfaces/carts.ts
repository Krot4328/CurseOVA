import { type HttpSearch } from '@boilerplate/core/interfaces/http'

import { type GetProductShort } from '@boilerplate/types/products/interfaces/products'

export interface CartItem {
  product: GetProductShort
  quantity: number
}

export interface GetCart {
  items: CartItem[]
}

export interface GetCartsSearch extends HttpSearch {
  page?: string
  pageSize?: string
}

export interface PatchCartData {
  productId: string
  quantity?: number
}

export interface PatchCartResult {
  isSuccess: boolean
}

export interface PostCartResult {
  cartId: string
  isSuccess: boolean
}

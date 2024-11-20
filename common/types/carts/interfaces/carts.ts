import { type HttpSearch } from '@boilerplate/core/interfaces/http'

import { type GetProductShort } from '@boilerplate/types/products/interfaces/products'

export interface CartItem {
  product: GetProductShort
  quantity: number
}

export interface GetCart {
  id: string

  profileId: string

  firstName: string
  lastName: string
  phone: string
  email: string
  city: string
  department: string
  paymentStatus: StatusType

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

export interface PostCartData {
  force: boolean
}

export interface PostCartResult {
  cartId: string
  isSuccess: boolean
}

export interface PatchCartUserData {
  firstName?: string
  lastName?: string
  phone?: string
  email?: string
  city?: string
  department?: string
}

export interface PatchCartUserDataResult {
  isSuccess: boolean
}

export enum StatusType {
  Pending = 'pending',
  Processing = 'processing',
  Paid = 'paid',
  Completed = 'completed',
  Failed = 'failed',
}

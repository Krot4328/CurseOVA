import { type HttpSearch } from '@boilerplate/core/interfaces/http'

import { type Image } from '@boilerplate/types/files/interfaces/files'
import { type CurrencyType } from '@boilerplate/types/reference/interfaces/currency'
import { type Tag } from '@boilerplate/types/reference/interfaces/tags'

export interface Price {
  value: number
  currency: CurrencyType
}

export interface PostProductData {
  title: string
  description: string
  price: Price
  tagsIds: string[]
  imagesIds: string[]
}

export interface PostProductResult {
  isSuccess: boolean
}

export interface GetProductsSearch extends HttpSearch {
  search?: string

  tagsIds?: string[]
}

export interface GetProductShort {
  id: string
  title: string
  price: Price

  images: Image[]

  tags: Tag[]
}

export interface GetProduct extends GetProductShort {
  description: string
}

export interface PatchProductData {
  title?: string
  description?: string

  price?: Price

  imagesIds?: string[]

  tagsIds?: string[]
}

export interface PatchProductResult {
  isSuccess: boolean
}

export interface DeleteProductResult {
  isSuccess: boolean
}

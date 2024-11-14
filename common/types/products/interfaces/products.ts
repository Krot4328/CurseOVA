import { type HttpSearch } from '@boilerplate/core/interfaces/http'

export interface PostProductData {
  title: string
  description: string
  price: number
  tags: string[]
  fileId: string
}

export interface PostProductResult {
  isSuccess: boolean
}

export interface GetProductsSearch extends HttpSearch {
  search?: string

  page?: string
  pageSize?: string

  tagsIds?: string[]
}

export interface GetProductDataShort {
  id: string
  title: string
  price: number
  images: string[]

  tags: string[]
}

export interface GetProductData extends GetProductDataShort {
  description: string
  tackle: string
}

export interface PatchProductData {
  title?: string
  price?: number
  images?: string[]

  tags?: string[]
}

export interface PatchProductResult {
  isSuccess: boolean
}

export interface DeleteProductResult {
  isSuccess: boolean
}

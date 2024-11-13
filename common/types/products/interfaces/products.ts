export interface GetProductDataShort {
  id: string
  title: string
  price: number
  pathToImage: string
}

export interface GetProductData extends GetProductDataShort {
  description: string
  tackle: string
}

export enum Tackle {
  Rod = 'Rod',
  Reel = 'Reel',
  Line = 'Line',
  Hook = 'Hook',
  Sinkers = 'Sinkers',
  Floats = 'Floats',
  Lures = 'Lures',
  Bait = 'Bait',
  Swivels = 'Swivels',
  Leaders = 'Leaders',
  Nets = 'Nets',
  Traps = 'Traps',
}

export interface PostProductData {
  title: string
  description: string
  price: number
  tackle: Tackle
  file: Express.Multer.File
}

export interface GetSearchProduct {
  title?: string
  tackle?: string[]
}

export interface PostProductResult {
  isSuccess: boolean
}

export interface GetProductsListResult {
  isSuccess: boolean
}

export interface GetSingleproductsData {
  productId: string
}

export interface DeleteProductResult {
  isSuccess: boolean
}

import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ProductsService } from '@boilerplate/back-end/modules/products/services/products.service'

@Controller()
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
}

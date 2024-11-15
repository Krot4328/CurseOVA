import { IsEnum, IsNumber, Min } from 'class-validator'

import { HttpRequestFieldDecorator } from '@boilerplate/core/decorators/http-request-field.decorator'

import { type Price } from '@boilerplate/types/products/interfaces/products'
import { CurrencyType } from '@boilerplate/types/reference/interfaces/currency'

export class PriceDto implements Price {
  @HttpRequestFieldDecorator()
  @IsNumber()
  @Min(0.01)
  value: number

  @HttpRequestFieldDecorator()
  @IsEnum(CurrencyType)
  currency: CurrencyType
}

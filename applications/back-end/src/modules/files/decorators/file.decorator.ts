import { extname } from 'path'

import { UseInterceptors, applyDecorators } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { v4 as uuid } from 'uuid'

export function File<Y>(
  destination: string,
): (target: object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination,
          filename: (req, file, cb) => {
            const id = uuid()

            Object.assign(file, { id })

            cb(null, `${uuid(id)}${extname(file.originalname)}`)
          },
        }),
      }),
    ),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  )
}

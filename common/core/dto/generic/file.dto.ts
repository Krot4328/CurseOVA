import { IsNumber, IsString } from 'class-validator'

import { type File } from '@boilerplate/core/interfaces/file'

export class FileDto implements File {
  @IsString()
  id: string

  @IsString()
  fieldname: string

  @IsString()
  originalname: string

  @IsString()
  encoding: string

  @IsString()
  mimetype: string

  @IsNumber()
  size: number

  @IsString()
  destination: string

  @IsString()
  filename: string

  @IsString()
  path: string
}

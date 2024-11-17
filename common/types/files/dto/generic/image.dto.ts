import { IsString, IsUUID } from 'class-validator'

import { type Image } from '@boilerplate/types/files/interfaces/files'

export class ImageDto implements Image {
  @IsUUID(4)
  id: string

  @IsString()
  src: string
}

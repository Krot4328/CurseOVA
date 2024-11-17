import { relative } from 'path'

import { Injectable } from '@nestjs/common'

import { File } from '@boilerplate/core/interfaces/file'

import { Image } from '@boilerplate/types/files/interfaces/files'

import { FileEntity } from '@boilerplate/back-end/modules/files/entities/file.entity'

@Injectable()
export class FilesDataMapper {
  fromFile(file: File, userGid: string = null): File & { userGid: string | null; src: string } {
    const { id, fieldname, originalname, encoding, mimetype, size, destination, filename, path } = file

    return {
      id,
      fieldname,
      originalname,
      encoding,
      mimetype,
      size,
      destination,
      filename,
      path,
      src: `/${relative(process.cwd(), path)}`,
      userGid,
    }
  }

  toFileId(file: File): string {
    const { id } = file

    return id
  }

  toImage(entity: FileEntity): Image {
    const { id, src } = entity

    return {
      id,
      src,
    }
  }
}

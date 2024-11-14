import { Injectable } from '@nestjs/common'

import { File } from '@boilerplate/core/interfaces/file'

@Injectable()
export class FilesDataMapper {
  fromFile(file: File, userGid: string = null): File & { userGid: string | null } {
    const { id, fieldname, originalname, encoding, mimetype, size, destination, filename, path } = file

    return { id, fieldname, originalname, encoding, mimetype, size, destination, filename, path, userGid }
  }

  toFileId(file: File): string {
    const { id } = file

    return id
  }
}

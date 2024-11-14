import { Injectable } from '@nestjs/common'

import { File } from '@boilerplate/core/interfaces/file'
import { HttpServerResponse } from '@boilerplate/core/interfaces/http'

import { PostFilePreloadResult } from '@boilerplate/types/files/interfaces/files'

import { FilesRepository } from '@boilerplate/back-end/modules/files/repositories/files.repository'

import { FilesDataMapper } from '@boilerplate/back-end/modules/files/data-mappers/files.data-mapper'

@Injectable()
export class FilesService {
  constructor(
    private readonly filesRepository: FilesRepository,

    private readonly filesDataMapper: FilesDataMapper,
  ) {}

  async postFileInfo(file: File, userGid: string = null): Promise<HttpServerResponse<PostFilePreloadResult>> {
    const fileInfo = await this.filesRepository.save(this.filesDataMapper.fromFile(file, userGid))

    const result: PostFilePreloadResult = {
      id: this.filesDataMapper.toFileId(fileInfo),
    }

    return { result }
  }
}

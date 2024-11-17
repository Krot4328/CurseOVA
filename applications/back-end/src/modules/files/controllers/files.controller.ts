import { resolve } from 'path'

import { Controller, Logger, Post, Request, UploadedFile, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { omit } from 'lodash'

import { Roles } from '@boilerplate/core/decorators/roles.decorator'
import { FileDto } from '@boilerplate/core/dto/generic/file.dto'
import { Role } from '@boilerplate/core/interfaces/user'

import {
  PostFilePreloadRequestHttpServerRequestDto,
  PostFilePreloadRequestUrl,
} from '@boilerplate/types/files/dto/requests/files'
import { PostFilePreloadHttpResponseDto } from '@boilerplate/types/files/dto/responses/files'

import { JwtPassportAuthGuard } from '@boilerplate/back-end/modules/auth/guards/jwt-passport.guard'

import { FilesService } from '@boilerplate/back-end/modules/files/services/files.service'

import { File } from '@boilerplate/back-end/modules/files/decorators/file.decorator'

@Controller()
@ApiTags('Files')
@ApiBearerAuth()
@UseGuards(JwtPassportAuthGuard)
export class FilesController {
  private readonly logger = new Logger(FilesController.name)

  constructor(private readonly filesService: FilesService) {}

  @Post(PostFilePreloadRequestUrl)
  @Roles([Role.Admin])
  @File(resolve(process.cwd(), 'uploads', 'files'))
  async postFilePreload(
    @Request() request: PostFilePreloadRequestHttpServerRequestDto,
    @UploadedFile() file: FileDto,
  ): Promise<PostFilePreloadHttpResponseDto> {
    const {
      user: { gid: userGid },
    } = request

    this.logger.log({
      method: 'POST',
      action: 'postFilePreload',
      file: omit(file, ['stream', 'buffer']),
    })

    return await this.filesService.postFileInfo(file, userGid)
  }
}

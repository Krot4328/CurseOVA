import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'

import { FileEntity } from '@boilerplate/back-end/modules/files/entities/file.entity'

import { FilesRepository } from '@boilerplate/back-end/modules/files/repositories/files.repository'

import { FilesController } from '@boilerplate/back-end/modules/files/controllers/files.controller'

import { FilesService } from '@boilerplate/back-end/modules/files/services/files.service'

import { FilesDataMapper } from '@boilerplate/back-end/modules/files/data-mappers/files.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), forwardRef(() => AuthModule)],
  controllers: [FilesController],
  providers: [FilesRepository, FilesService, FilesDataMapper],
  exports: [FilesRepository, FilesService, FilesDataMapper],
})
export class FilesModule {}

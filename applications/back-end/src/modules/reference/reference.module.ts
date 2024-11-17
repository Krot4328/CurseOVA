import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '@boilerplate/back-end/modules/auth/auth.module'

import { TagGroupEntity } from '@boilerplate/back-end/modules/reference/entities/tag-group.entity'
import { TagEntity } from '@boilerplate/back-end/modules/reference/entities/tag.entity'

import { ReferenceController } from '@boilerplate/back-end/modules/reference/controllers/reference.controller'

import { ReferenceService } from '@boilerplate/back-end/modules/reference/services/reference.service'

import { ReferenceDataMapper } from '@boilerplate/back-end/modules/reference/data-mappers/reference.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([TagGroupEntity, TagEntity]), forwardRef(() => AuthModule)],
  controllers: [ReferenceController],
  providers: [ReferenceService, ReferenceDataMapper],
  exports: [ReferenceService, ReferenceDataMapper],
})
export class ReferenceModule {}

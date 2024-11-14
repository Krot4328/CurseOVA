import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'

import { FileEntity } from '@boilerplate/back-end/modules/files/entities/file.entity'

@Injectable()
export class FilesRepository extends Repository<FileEntity> {
  constructor(readonly dataSource: DataSource) {
    super(FileEntity, dataSource.createEntityManager())
  }
}

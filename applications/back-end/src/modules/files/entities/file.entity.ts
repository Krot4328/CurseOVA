import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { File } from '@boilerplate/core/interfaces/file'

@Entity()
export class FileEntity implements File {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid', { nullable: true })
  userGid: string

  @Index()
  @Column('text')
  fieldname: string

  @Index()
  @Column('text')
  originalname: string

  @Index()
  @Column('text')
  encoding: string

  @Index()
  @Column('text')
  mimetype: string

  @Index()
  @Column()
  size: number

  @Index()
  @Column('text')
  destination: string

  @Index()
  @Column('text')
  filename: string

  @Index()
  @Column('text')
  path: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}

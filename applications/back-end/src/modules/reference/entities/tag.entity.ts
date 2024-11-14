import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { TagGroupEntity } from '@boilerplate/back-end/modules/reference/entities/tag-group.entity'

@Entity()
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index()
  @Column('uuid')
  tagGroupId: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @ManyToOne(() => TagGroupEntity, (tagGroup) => tagGroup.tags)
  @JoinColumn({ name: 'tagGroupId' })
  tagGroup: TagGroupEntity
}

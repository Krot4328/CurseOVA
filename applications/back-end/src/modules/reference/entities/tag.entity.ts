import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ProductToTagEntity } from '@boilerplate/back-end/modules/products/entities/product-to-tag.entity'
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

  @OneToMany(() => ProductToTagEntity, (productToTag) => productToTag.tag)
  toProducts: ProductToTagEntity[]
}

import { type MigrationInterface, type QueryRunner } from 'typeorm'

import { TagGroupEntity } from '@boilerplate/back-end/modules/reference/entities/tag-group.entity'

export class TagsGroups1731579147568 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(TagGroupEntity)
      .values([
        { id: '88039e3b-2a40-4228-a8a0-ba4ac3d210ae', name: 'Вудки' },
        { id: 'cda1a908-32a2-43b5-ac2a-078e55f908d2', name: 'Котушки' },
        { id: 'e8ad1891-c0ad-47a2-b32c-ea1febd8db2d', name: 'Ліски' },
        { id: '3433c250-9fbc-47ed-ad9b-9051b02ac20b', name: 'Гачоки' },
        { id: '378b7996-f10a-4ec5-b50e-06e522a805db', name: 'Грузила' },
        { id: '98742eb7-aba4-49c3-b970-441fd5a199b1', name: 'Поплавці' },
        { id: 'e592d4b0-39eb-44d0-bfca-0ce0e4509535', name: 'Приманки' },
        { id: '2cb042f5-d5ac-4e0c-bd0d-e8b61c503dae', name: 'Наживка' },
        { id: '95f50a7c-0531-45b2-b552-a8bd024abd69', name: 'Вертілюги' },
        { id: '56c753fd-9052-4e52-97a5-508de0fab71e', name: 'Повідці' },
        { id: 'fcc7bd4c-93df-4305-a694-c66a72508bfe', name: 'Сітки' },
        { id: 'bea65477-7fbe-4912-b837-f72d19a9e26f', name: 'Ловушки' },
      ])
      .execute()
  }

  async down(queryRunner: QueryRunner): Promise<void> {}
}

import { type MigrationInterface, type QueryRunner } from 'typeorm'

import { TagEntity } from '@boilerplate/back-end/modules/reference/entities/tag.entity'

export class SeedTags1731764488661 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values([
        {
          id: 'e772a84d-6afa-4c6b-983d-292ce3448ee1',
          name: 'Спінінги',
          tagGroupId: '88039e3b-2a40-4228-a8a0-ba4ac3d210ae',
        },
        {
          id: 'aec6fb0a-9e4f-4525-9cc5-6a381bde7a53',
          name: 'Фідери',
          tagGroupId: '88039e3b-2a40-4228-a8a0-ba4ac3d210ae',
        },
        {
          id: '71041922-ee54-4c61-bc2c-b3d1cf3df4af',
          name: 'Махові вудки',
          tagGroupId: '88039e3b-2a40-4228-a8a0-ba4ac3d210ae',
        },
        {
          id: '29ed75f9-e0b7-478c-a919-c12314fe1885',
          name: 'Телескопічні вудки',
          tagGroupId: '88039e3b-2a40-4228-a8a0-ba4ac3d210ae',
        },

        {
          id: 'ac3bc040-17fa-4801-85ce-30db293cbaa6',
          name: 'Передньо-фрикційні котушки',
          tagGroupId: 'cda1a908-32a2-43b5-ac2a-078e55f908d2',
        },
        {
          id: '079d1771-7e94-43a4-b8ab-69af67b68948',
          name: 'Задньо-фрикційні котушки',
          tagGroupId: 'cda1a908-32a2-43b5-ac2a-078e55f908d2',
        },
        {
          id: '59a5cc6d-fcd1-471a-9f3e-b4be07b82441',
          name: 'Байткастингові котушки',
          tagGroupId: 'cda1a908-32a2-43b5-ac2a-078e55f908d2',
        },
        {
          id: '59806894-1588-453b-bb4c-8d32db7944cf',
          name: 'Безінерційні котушки',
          tagGroupId: 'cda1a908-32a2-43b5-ac2a-078e55f908d2',
        },

        {
          id: 'd5ad8d8c-1a70-43fe-b792-5acf108424a0',
          name: 'Монофільна лісочка',
          tagGroupId: 'e8ad1891-c0ad-47a2-b32c-ea1febd8db2d',
        },
        {
          id: '38fd84ef-192d-43bd-99d6-455ed863317c',
          name: 'Плетена лісочка',
          tagGroupId: 'e8ad1891-c0ad-47a2-b32c-ea1febd8db2d',
        },
        {
          id: '87789e9c-d43c-4c14-bf5c-4393793a1910',
          name: 'Шнури для риболовлі',
          tagGroupId: 'e8ad1891-c0ad-47a2-b32c-ea1febd8db2d',
        },
        {
          id: '74b0395e-aa21-4a9f-9b11-3a7350615f23',
          name: 'Джерсі лісочка',
          tagGroupId: 'e8ad1891-c0ad-47a2-b32c-ea1febd8db2d',
        },

        {
          id: 'cec966d8-5a08-4759-8e79-ef18fe964b4c',
          name: 'Риболовні гачки',
          tagGroupId: '3433c250-9fbc-47ed-ad9b-9051b02ac20b',
        },
        {
          id: '98e22748-7acf-4325-95ad-fc0a253bc00b',
          name: 'Гачки для морської риболовлі',
          tagGroupId: '3433c250-9fbc-47ed-ad9b-9051b02ac20b',
        },
        {
          id: 'c161fd8d-0d83-452a-bd2e-9f6b71166e69',
          name: 'Мікрогачки',
          tagGroupId: '3433c250-9fbc-47ed-ad9b-9051b02ac20b',
        },
        {
          id: 'ddfee6cf-e359-4aea-a562-f9927d42e781',
          name: 'Гачки з подвійним жалом',
          tagGroupId: '3433c250-9fbc-47ed-ad9b-9051b02ac20b',
        },

        {
          id: '6470bd41-9ade-4e92-8a20-453a5df6b4a2',
          name: 'Плоскі грузила',
          tagGroupId: '378b7996-f10a-4ec5-b50e-06e522a805db',
        },
        {
          id: '745fc640-0aa7-413f-8598-15cd780f0cd5',
          name: 'Кулясті грузила',
          tagGroupId: '378b7996-f10a-4ec5-b50e-06e522a805db',
        },
        {
          id: '903208eb-ce31-4972-b41d-98313c596406',
          name: 'Грузила для фідера',
          tagGroupId: '378b7996-f10a-4ec5-b50e-06e522a805db',
        },
        {
          id: '92600b75-5dae-4994-9d72-88ff607d7b78',
          name: 'Рівноважні грузила',
          tagGroupId: '378b7996-f10a-4ec5-b50e-06e522a805db',
        },

        {
          id: 'd8281fca-7349-439c-a526-5fac028af4f2',
          name: 'Махові поплавці',
          tagGroupId: '98742eb7-aba4-49c3-b970-441fd5a199b1',
        },
        {
          id: '08d677c2-b56b-4b02-9c91-5ec33a7860b8',
          name: 'Підводні поплавці',
          tagGroupId: '98742eb7-aba4-49c3-b970-441fd5a199b1',
        },
        {
          id: 'c32c600f-91f8-4de9-a3f1-b528eb8cca9f',
          name: 'Поплавці для фідера',
          tagGroupId: '98742eb7-aba4-49c3-b970-441fd5a199b1',
        },
        {
          id: 'c92227ab-6523-4de1-91da-61fadf14c1bc',
          name: 'Поплавці для риболовлі на коропа',
          tagGroupId: '98742eb7-aba4-49c3-b970-441fd5a199b1',
        },

        {
          id: 'a4ce8ef6-5b07-42f9-b34f-602d083bc1c5',
          name: 'Твістери',
          tagGroupId: 'e592d4b0-39eb-44d0-bfca-0ce0e4509535',
        },
        {
          id: 'fe41ecb5-3c27-4228-a0f4-1debf298d1ed',
          name: 'Воблери',
          tagGroupId: 'e592d4b0-39eb-44d0-bfca-0ce0e4509535',
        },
        {
          id: '5ef7d032-5717-4e1e-863b-f2c76296c26b',
          name: 'Мормишки',
          tagGroupId: 'e592d4b0-39eb-44d0-bfca-0ce0e4509535',
        },
        {
          id: '4089c8e3-7e18-40eb-8026-847befc538d4',
          name: 'Наживки',
          tagGroupId: 'e592d4b0-39eb-44d0-bfca-0ce0e4509535',
        },

        {
          id: 'deab1ced-9f6b-4724-874c-1b3577d3ec4f',
          name: 'Черви',
          tagGroupId: '2cb042f5-d5ac-4e0c-bd0d-e8b61c503dae',
        },
        {
          id: 'ec06540a-69f8-4e66-b920-d4943420b119',
          name: 'Рибки на наживку',
          tagGroupId: '2cb042f5-d5ac-4e0c-bd0d-e8b61c503dae',
        },
        {
          id: 'cb9ee619-aec0-430a-ab60-8fd57ef96383',
          name: "М'ясо та інші наживки",
          tagGroupId: '2cb042f5-d5ac-4e0c-bd0d-e8b61c503dae',
        },
        {
          id: '2ce23b0a-30d9-4ea0-bc86-acce24148294',
          name: 'Бойли',
          tagGroupId: '2cb042f5-d5ac-4e0c-bd0d-e8b61c503dae',
        },

        {
          id: '07809f7c-6333-4512-8bd3-a7f765b8473f',
          name: 'Вертлюги для риболовлі',
          tagGroupId: '95f50a7c-0531-45b2-b552-a8bd024abd69',
        },
        {
          id: '2c03acd9-65d8-469a-9592-682de602fbb3',
          name: 'Вертілюги з подвійними кільцями',
          tagGroupId: '95f50a7c-0531-45b2-b552-a8bd024abd69',
        },
        {
          id: 'b6336952-263c-49a4-9ced-b187e400bffd',
          name: 'Турбінні вертілюги',
          tagGroupId: '95f50a7c-0531-45b2-b552-a8bd024abd69',
        },
        {
          id: 'e830d515-005f-49fb-864e-43b0a08e4131',
          name: 'Класичні вертілюги',
          tagGroupId: '95f50a7c-0531-45b2-b552-a8bd024abd69',
        },

        {
          id: 'bed25095-18ca-4830-ad6e-f31dede60979',
          name: 'Необроблені повідці',
          tagGroupId: '56c753fd-9052-4e52-97a5-508de0fab71e',
        },
        {
          id: 'f0701ecf-73b9-422d-a9a5-dd659b4cd4d3',
          name: 'Куплені повідці',
          tagGroupId: '56c753fd-9052-4e52-97a5-508de0fab71e',
        },
        {
          id: 'c360df93-c33a-4c72-b7dc-85c2942ee09c',
          name: 'Повідці для тролінгу',
          tagGroupId: '56c753fd-9052-4e52-97a5-508de0fab71e',
        },
        {
          id: 'bbb40432-72cc-42ec-8443-6fb4677bd42a',
          name: 'Повідці для дрібної риби',
          tagGroupId: '56c753fd-9052-4e52-97a5-508de0fab71e',
        },

        {
          id: '35405253-b091-477c-99bd-f999e400d8c8',
          name: 'Рибальські сітки',
          tagGroupId: 'fcc7bd4c-93df-4305-a694-c66a72508bfe',
        },
        {
          id: '592cfd89-3350-46ba-995a-550b29e07801',
          name: 'Сітки для ловлі раків',
          tagGroupId: 'fcc7bd4c-93df-4305-a694-c66a72508bfe',
        },
        {
          id: '534177c8-a495-4ce4-97d5-2e1010b3e69b',
          name: 'Мережі для лову риби',
          tagGroupId: 'fcc7bd4c-93df-4305-a694-c66a72508bfe',
        },
        {
          id: 'cd23951b-ed55-4c84-a6af-9a8c09534cd1',
          name: 'Мікросітки',
          tagGroupId: 'fcc7bd4c-93df-4305-a694-c66a72508bfe',
        },

        {
          id: '58b05a5a-bfcf-49bb-8e00-4d2e5d58153c',
          name: 'Ловушки для раків',
          tagGroupId: 'bea65477-7fbe-4912-b837-f72d19a9e26f',
        },
        {
          id: '0e91a9cf-8039-4bab-afc2-308ff472cc45',
          name: 'Капкани для риби',
          tagGroupId: 'bea65477-7fbe-4912-b837-f72d19a9e26f',
        },
        {
          id: '24e899be-359f-443c-800f-e1ebcafafb75',
          name: 'Ловушки для дрібної риби',
          tagGroupId: 'bea65477-7fbe-4912-b837-f72d19a9e26f',
        },
        {
          id: '2d20832e-5940-4b9f-9ce0-a36f6954ae57',
          name: 'Ловушки для птахів',
          tagGroupId: 'bea65477-7fbe-4912-b837-f72d19a9e26f',
        },
      ])
      .execute()
  }

  async down(queryRunner: QueryRunner): Promise<void> { }
}

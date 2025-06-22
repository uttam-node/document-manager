import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from 'src/modules/users/users.service';
import { Role } from 'src/common/enums/role.enum';

import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  for (let i = 0; i < 1000; i++) {
    const email = faker.internet.email();
    const password = 'Password123';
    const role = faker.helpers.arrayElement([Role.ADMIN, Role.EDITOR, Role.VIEWER]);

    await usersService.createUser({ email, password, role });
  }

  console.log('Seed complete.');
  await app.close();
}
bootstrap();

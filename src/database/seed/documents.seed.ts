import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DocumentsService } from 'src/modules/documents/documents.service';
import { faker } from '@faker-js/faker';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(DocumentsService);

  console.time('Seeding Documents');

  for (let i = 0; i < 100000; i++) {
    const dto = {
      title: faker.lorem.sentence(3),
      description: faker.lorem.paragraph(),
    };
    await service.create(dto, `uploads/fake-file-${i}.pdf`);
    if (i % 500 === 0) console.log(`Created ${i} documents`);
  }

  console.timeEnd('Seeding Documents');
  await app.close();
}
bootstrap();

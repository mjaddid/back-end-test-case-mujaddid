import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const option = new DocumentBuilder().setTitle('Library API').build();
  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('', app, document);

  await app.listen(3000);
}
bootstrap();

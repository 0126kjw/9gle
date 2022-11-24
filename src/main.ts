import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); //CORS 해제

  // Swaggwer 적용
  const config = new DocumentBuilder()
    .setTitle('9gle')
    .setDescription('9gle API description')
    .setVersion('1.0')
    .addTag('Map')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // await app.listen(3000);
  await app.listen(process.env.PORT || 8080);
}
bootstrap();

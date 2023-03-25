import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  const apidoc = new DocumentBuilder()
    .setTitle('AffinityCoin API')
    .setDescription('The API description')
    .setVersion('0.0.1')
    .addTag('Members')
    .addTag('Groups')
    .build();
  const document = SwaggerModule.createDocument(app, apidoc);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(port);
}
bootstrap();

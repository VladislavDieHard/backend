import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getConfig } from './utils/getConfig';
import cookieParser from 'cookie-parser';
import { migrate } from './migrations/migrate';

async function bootstrap() {
  const appConfig = getConfig();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Infomania backend')
    .setDescription('The infomania API description')
    .setVersion('1.0')
    .setContact('DieHard', 'https://t.me/vladdamage', '')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  await migrate()
  await app.listen(appConfig['MAIN_PORT'] || 3001);
}
bootstrap();

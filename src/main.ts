import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
      .setTitle('Memo API')                     // API 문서 제목
      .setDescription('Nest.JS 메모 앱 API 문서') // 설명
      .setVersion('1.0')                        // 버전
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-memo', app, document); // /swagger-memo 경로로 접속

  await app.listen(process.env.PORT ?? 9999);
}
bootstrap();

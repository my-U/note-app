import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {AllExceptionsFilter} from "./common/filter/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 전역 예외 필터 등록 - 처리되지 않은 모든 예외를 잡아 에러 로그와 스택 트레이스를 출력
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger 설정
  const config = new DocumentBuilder()
      .setTitle('Memo API')                     // API 문서 제목
      .setDescription('Nest.JS 메모 앱 API 문서') // 설명
      .setVersion('1.0')                        // 버전
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-memo', app, document); // /swagger-memo 경로로 접속

  await app.listen(process.env.PORT ?? 9999);

  // CORS 설정 - 허용할 출처(origin), HTTP 메서드, 헤더를 정의
  app.enableCors({
    origin: process.env.CORS_ORIGIN,   // 허용할 프론트엔드 주소 (필요에 따라 변경)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'],  // 허용할 요청 헤더
    credentials: true,                 // 쿠키/인증 헤더 포함 요청 허용
  });
}
bootstrap();

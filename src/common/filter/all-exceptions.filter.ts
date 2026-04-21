import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch()에 인자를 주지 않으면 모든 종류의 예외를 잡음 (HttpException 포함, 런타임 에러 포함)
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // HTTP 컨텍스트로 전환하여 요청/응답 객체를 가져옴
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // HttpException이면 해당 상태코드 사용, 그 외 런타임 에러는 500으로 처리
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // Error 인스턴스인 경우 stack에 발생 파일과 라인 번호가 포함되어 있음
    if (exception instanceof Error) {
      this.logger.error(
        `${request.method} ${request.url} ${status} - ${message}`,
        exception.stack, // 출력 예시: at MemoService.findOneMemo (memo.service.ts:25:13)
      );
    } else {
      this.logger.error(`${request.method} ${request.url} ${status} - ${String(exception)}`);
    }

    // 클라이언트에 에러 응답 반환
    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

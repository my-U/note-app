import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// NestMiddleware를 구현하면 HTTP 요청이 컨트롤러에 도달하기 전에 가로챌 수 있음
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // 'HTTP' 컨텍스트 이름으로 로그를 출력 → [HTTP] 형태로 출력됨
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now(); // 요청 시작 시간 기록

    // 응답이 완전히 전송된 시점(finish 이벤트)에 로그 출력
    // 이 시점에 statusCode가 확정되므로 finish 이벤트에서 로그를 남김
    res.on('finish', () => {
      const duration = Date.now() - start;
      // 출력 예시: GET /memo 200 - 45ms
      this.logger.log(`${method} ${originalUrl} ${res.statusCode} - ${duration}ms`);
    });

    // 다음 미들웨어 또는 라우트 핸들러로 요청을 넘김
    next();
  }
}

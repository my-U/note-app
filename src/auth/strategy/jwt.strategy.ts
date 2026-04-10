import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    // JWT를 어떻게 파싱하고 검증할지 부모 클래스(PassportStrategy)에 설정을 전달하는 코드
    constructor() {
        // 중괄호 안에 로직이 필요한 경우:
        // - super()로 부모 클래스에 초기값을 넘겨야 할 때
        // - 클래스 인스턴스 생성 시 한 번만 실행해야 하는 초기화 작업이 있을 때
        super({
            /*
               부모인 passport-jwt Strategy에게 설정 전달
               부모가 JWT 검증을 처리하고, 성공 시 validate() 메서드를 호춝
             */
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization: Bearer <token> 헤더에서 토큰 추출
            secretOrKey: process.env.JWT_SECRET || '' // 토큰 서명 검증에 사용할 시크릿 키
            // secretOrKey는 타입을 string | Buffer만 허용하는데 process.env.JWT_SECRET의 타입이 string | undefined이라 TypeScript가 undefined일 수 있다고 오류를 냄
            // 그래서 기본값 설정
        });
    }

    // JWT 검증 후 실행되는 메서드
    // 토큰 자체는 유효한데, 추가 검증이 필요할 때 사용
    validate(payload: any) { // payload는 이미 검증된 JWT의 내용 (디코딩된 상태)
        return { userId: payload.sub, username: payload.username };
        // ↑ 이 반환값이 request.user에 자동으로 들어감
    }
}
import {Module} from "@nestjs/common";
import {AuthController} from "./controller/auth.controller";
import {AuthService} from "./service/auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {JwtStrategy} from "./strategy/jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        // passport 패키지가 제공하는 모듈, 등록해야 AuthGuard가 jwt 전략을 인식할 수 있음
        PassportModule,
        // jwt 토큰 생성(sign)과 검증(verify)을 위해 등록. secret과 만료시간 설정 포함
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1h'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
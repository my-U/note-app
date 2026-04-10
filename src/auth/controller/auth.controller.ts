import {Body, Controller, Post} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthService} from "../service/auth.service";
import {RegisterDto} from "../dto/register.dto";
import {LoginDto} from "../dto/login.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
       private readonly authService: AuthService
    ) {}

    @Post('register') // 고정 경로. :가 있으면 동적 경로
    @ApiOperation({summary: '회원 가입'})
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({summary: '로그인'})
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
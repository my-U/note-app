import {Injectable, UnauthorizedException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {Repository} from "typeorm";
import {RegisterDto} from "../dto/register.dto";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "../dto/login.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto): Promise<void> {
        const user = this.userRepository.create({
            username: registerDto.username,
            password: await bcrypt.hash(registerDto.password, 10),
            email: registerDto.email
        });
        await this.userRepository.save(user);
    }

    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findOne({
            where: {username: loginDto.username} // 조건 묶음 전달 가능 { username: "abc", email: "abc@test.com" }
        });

        // 유저가 없거나 비밀번호 불일치
        if(!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('아이디 또는 비밀번호가 올바르지 않습니다.');
        }

        // JWT payload 구성 후 토큰 발급
        // subject : 토큰의 주인을 나타 내는 표준 필드
        const payload = {sub: user.id, username: user.username};
        return {accessToken: this.jwtService.sign(payload)};
    }
}

import { Module } from '@nestjs/common';
import { MemoController } from './memo/controller/memo.controller';
import { MemoService } from './memo/service/memo.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import {MemoModule} from "./memo/memo.module";

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT as string), // as string : 이 값은 무조건 string이다 라고 알려주는 설정
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // entity 파일을 찾아서 TypeORM에 인식시키는 설정 (테이블 생성/수정 대상 지정)
        synchronize: true  // entity 파일을 기반으로 DB 테이블을 자동으로 생성/수정해주는 설정
      }),
      MemoModule // memo.module.ts 등록
  ],
})
export class AppModule {}

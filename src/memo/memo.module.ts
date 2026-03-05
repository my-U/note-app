import {MemoController} from "./controller/memo.controller";
import {MemoService} from "./service/memo.service";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Memo} from "./entity/memo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Memo])], // 해당 모듈의 service에서 Repository<Memo>를 주입받아 사용할 수 있게 등록하는 설정
    controllers: [MemoController],
    providers: [MemoService]
})
export class MemoModule {}
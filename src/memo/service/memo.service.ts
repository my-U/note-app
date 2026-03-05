import { Injectable } from '@nestjs/common';
import {Memo} from "../entity/memo.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateMemoDto} from "../dto/create-memo.dto";
import {UpdateMemoDto} from "../dto/update-memo.dto";

@Injectable() // 이 클래스는 주입 가능한 클래스 라고 알려 주는 데코레이터. Java의 @Service, @Component와 동일
export class MemoService {
  constructor(
      @InjectRepository(Memo)
      private readonly memoRepository: Repository<Memo>
  ) {}

  findAllMemo(): Promise<Memo[]> {
      return this.memoRepository.find();
  }

  findOneMemo(id: number): Promise<Memo | null> { // 반환값은 Memo 또는 null
      return this.memoRepository.findOneBy({ id });
  }

  createMemo(createMemoDto: CreateMemoDto): Promise<Memo> {
      const memo = this.memoRepository.create(createMemoDto);
      return this.memoRepository.save(memo);
  }

  async updateMemo(id: number, updateMemoDto: UpdateMemoDto): Promise<Memo | null> { // update 메서드는 첫 번째 인자로 조건(id)을 전달해야 함
      await this.memoRepository.update(id, updateMemoDto);
      return this.memoRepository.findOneBy({id});
  }

  async deleteMemo(id: number): Promise<void> {
      await this.memoRepository.delete(id);
  }
}

import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { MemoService } from '../service/memo.service';
import {CreateMemoDto} from "../dto/create-memo.dto";
import {UpdateMemoDto} from "../dto/update-memo.dto";

@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  findAllMemo() {
    return this.memoService.findAllMemo();
  }

  @Get(':id') // 경로 변수
  findOneMemo(@Param('id') id: number) {
    return this.memoService.findOneMemo(id);
  }

  @Post()
  createMemo(@Body() createMemoDto: CreateMemoDto) {
    return this.memoService.createMemo(createMemoDto);
  }

  @Patch(':id')
  updateMemo(@Param('id') id: number, @Body() updateMemoDto: UpdateMemoDto) {
    return this.memoService.updateMemo(id, updateMemoDto);
  }

  @Delete(':id')
  deleteMemo(@Param('id') id: number) {
    return this.memoService.deleteMemo(id);
  }
}

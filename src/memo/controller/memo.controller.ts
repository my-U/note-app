import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { MemoService } from '../service/memo.service';
import {CreateMemoDto} from "../dto/create-memo.dto";
import {UpdateMemoDto} from "../dto/update-memo.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('memo')
@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  @ApiOperation({ summary: '메모 전체 조회'})
  findAllMemo() {
    return this.memoService.findAllMemo();
  }

  @Get(':id') // 경로 변수
  @ApiOperation({ summary: '특정 메모 조회'})
  @ApiResponse({status: 404, description: '메모를 찾을 수 없음'})
  findOneMemo(@Param('id') id: number) {
    return this.memoService.findOneMemo(id);
  }

  @Post()
  @ApiOperation({ summary: '메모 등록'})
  createMemo(@Body() createMemoDto: CreateMemoDto) {
    return this.memoService.createMemo(createMemoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '메모 수정'})
  updateMemo(@Param('id') id: number, @Body() updateMemoDto: UpdateMemoDto) {
    return this.memoService.updateMemo(id, updateMemoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '메모 삭제'})
  deleteMemo(@Param('id') id: number) {
    return this.memoService.deleteMemo(id);
  }
}

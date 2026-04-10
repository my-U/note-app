import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { MemoService } from '../service/memo.service';
import {CreateMemoDto} from "../dto/create-memo.dto";
import {UpdateMemoDto} from "../dto/update-memo.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";

@ApiTags('memo')
@Controller('memo')
export class MemoController {
  constructor(private readonly memoService: MemoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt')) // JWT 토큰 검증 가드. 유효한 토큰이 없으면 401 반환, 있으면 아래 메서드 실행
  @ApiOperation({ summary: '메모 전체 조회'})
  findAllMemo() {
    return this.memoService.findAllMemo();
  }

  @Get(':id') // 경로 변수
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '특정 메모 조회'})
  @ApiResponse({status: 404, description: '메모를 찾을 수 없음'})
  findOneMemo(@Param('id') id: number) {
    return this.memoService.findOneMemo(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '메모 등록'})
  createMemo(@Body() createMemoDto: CreateMemoDto) {
    return this.memoService.createMemo(createMemoDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '메모 수정'})
  updateMemo(@Param('id') id: number, @Body() updateMemoDto: UpdateMemoDto) {
    return this.memoService.updateMemo(id, updateMemoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '메모 삭제'})
  deleteMemo(@Param('id') id: number) {
    return this.memoService.deleteMemo(id);
  }
}

import {ApiProperty} from "@nestjs/swagger";

export class CreateMemoDto {
    @ApiProperty({ description: '메모 제목', example: '오늘 할 일'}) // 필수 필드
    title: string;

    @ApiProperty({ description: '메모 내용', example: '장보기, 운동 하기'})
    content: string;
}
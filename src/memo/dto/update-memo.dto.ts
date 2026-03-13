import {ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateMemoDto {
    @ApiPropertyOptional({ description: '메모 제목', example: '수정할 제목' }) // 선택 필드
    title?: string; // ?는 선택적 필드(Optional)

    @ApiPropertyOptional({ description: '메모 제목', example: '수정할 내용' })
    content?: string; // title만 수정하거나 content만 수정하는 경우가 있기 때문에 둘 다 필수가 아님
}

export class UpdateMemoDto {
    title?: string; // ?는 선택적 필드(Optional)
    content?: string; // title만 수정하거나 content만 수정하는 경우가 있기 때문에 둘 다 필수가 아님
}
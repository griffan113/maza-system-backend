import { IsInt, IsOptional } from 'class-validator';

class PaginationRequestDTO {
  @IsOptional()
  @IsInt()
  page?: number;

  @IsOptional()
  @IsInt()
  take?: number;
}

export default PaginationRequestDTO;

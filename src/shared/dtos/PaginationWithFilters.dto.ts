import PaginationRequestDTO from '@shared/dtos/PaginationRequest.dto';

class PaginationWithFiltersDTO {
  pagination: PaginationRequestDTO;

  filter?: string;
}

export default PaginationWithFiltersDTO;

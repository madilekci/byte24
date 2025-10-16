import { SearchDto } from '@byte24/api/dto';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/pagination.dto';

export class AllPeopleDTO extends IntersectionType(SearchDto, PaginationDto) {}

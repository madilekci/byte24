import { OrderByDto, SearchDto } from '@byte24/api/dto';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/pagination.dto';

export class AllUsersDto extends IntersectionType(PaginationDto, SearchDto, OrderByDto) {}

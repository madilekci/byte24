import { AuthGuard } from '@/auth/auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import {} from '@prisma/client';
import { DefaultService } from './default.service';

@Controller('default')
@UseGuards(AuthGuard)
export class DefaultController {
  constructor(private service: DefaultService) {}
}

import { Module } from '@nestjs/common';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';
import { ICSHelper } from './ics.helper';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, ICSHelper],
  exports: [ICSHelper],
})
export class GeneralModule {}

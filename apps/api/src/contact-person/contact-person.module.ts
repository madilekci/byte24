import { Module } from '@nestjs/common';
import { ContactPersonController } from './contact-person.controller';
import { ContactPersonService } from './contact-person.service';

@Module({
  controllers: [ContactPersonController],
  providers: [ContactPersonService],
})
export class ContactPersonModule {}

import { AuthGuard } from '@/auth/auth.guard';
import { UserSession } from '@/auth/auth.type';
import { CurrentUserSession, PublicAuth } from '@/auth/decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { GeneralService } from './general.service';

@Controller('general')
@UseGuards(AuthGuard)
export class GeneralController {
  constructor(private service: GeneralService) {}

  @PublicAuth()
  @Get('/test-logging')
  async test() {
    return await this.service.testLogging();
  }

  @Get('/vat-codes')
  async getVatCodes() {
    return await this.service.getVatCodes();
  }

  @Get('/data-table/views')
  async getDataTableViews(
    @Query('screenTitle') screenTitle: string,
    @CurrentUserSession() { session, user }: UserSession
  ) {
    return await this.service.getDataTableViews(screenTitle, user.id);
  }

  @Post('/data-table/views')
  async createDataTableView(
    @Body() data: CreateViewDto,
    @Query('screenTitle') screenTitle: string,
    @CurrentUserSession() { session, user }: UserSession
  ) {
    return await this.service.createDataTableView(screenTitle, data, user.id);
  }

  @Put('/data-table/views')
  async updateDataTableView(
    @Query('screenTitle') screenTitle: string,
    @Body() data: UpdateViewDto,
    @CurrentUserSession() { session, user }: UserSession
  ) {
    return await this.service.updateDataTableView(screenTitle, data, user.id);
  }

  @Delete('/data-table/views/:id')
  async deleteDataTableView(@Param('id') id: string, @Session() { session, user }: UserSession) {
    return await this.service.deleteDataTableView(id, user.id);
  }
}

import { AuthGuard } from '@/auth/auth.guard';
import { UserSession } from '@/auth/auth.type';
import { CurrentUserSession, PublicAuth } from '@/auth/decorators';
import { SelectOption, SuccessDto, SuccessList } from '@byte24/api/dto';
import { IntParam, Success } from '@byte24/api/general';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Company, CompanyStatus, CompanyType, Country } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { CompanyService } from './company.service';
import { AllCompanysDto } from './dto/all-company.dto';
import { ListCompaniesDto } from './dto/company-list.dto';
import { CompanyDto } from './dto/company.dto';
import { KeyGuard } from '@/auth/key.guard';

@Controller('company')
@UseGuards(AuthGuard)
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Get('/')
  async getAllCompanies(
    @Query() rawQuery: string,
    @Query() dto: AllCompanysDto
  ): Promise<SuccessList<Company>> {
    const allCompanies = await this.service.getAllCompanies(dto, rawQuery);
    return allCompanies;
  }

  @Get('/list')
  async getCompanyList(
    @Request() req: ExpressRequest,
    @Query() query: ListCompaniesDto
  ): Promise<SelectOption[]> {
    return await this.service.getCompanyList(query);
  }

  @Get('/status')
  async getAllStatus(): Promise<CompanyStatus[]> {
    return await this.service.getAllStatus();
  }

  @Get('/types')
  async getAllTypes(): Promise<CompanyType[]> {
    return await this.service.getAllTypes();
  }

  @Get('/countries')
  async getAllCountries(): Promise<Country[]> {
    return await this.service.getAllCountries();
  }

  @Get('/:id')
  async getCompanyById(@Param('id', IntParam) id: number): Promise<SuccessDto> {
    const company = await this.service.getCompanyById(id);
    return Success('Succesvol bedrijf opgehaald', company);
  }

  @PublicAuth()
  @UseGuards(KeyGuard)
  @Get('/:id/metadata')
  async getCompanyMetadata(@Param('id', IntParam) id: number): Promise<Partial<Company>> {
    return await this.service.getCompanyMetadata(id);
  }

  // @Get('/documents/:id')
  // async getCompanyDocumentsById(
  //   @Param('id', IntParam) id: number,
  //   @Query() query: AllDocumentsDTO
  // ): Promise<CompanyDocument[]> {
  //   return await this.service.getCompanyDocumentsById(query, id);
  // }

  @Post('/')
  async addCompany(
    @Body() body: CompanyDto,
    @Request() req: ExpressRequest,
    @CurrentUserSession() { session, user }: UserSession
  ) {
    return await this.service.addCompany(body, user);
  }

  @Put('/:id')
  async updateCompany(
    @Param('id', IntParam) id: number,
    @Body() body: CompanyDto,
    @Request() req: ExpressRequest,
    @CurrentUserSession() { session, user }: UserSession
  ) {
    return await this.service.updateCompany(id, body, user);
  }

  @Delete('/:id')
  async deleteCompany(
    @Param('id', IntParam) id: number,
    @CurrentUserSession() { session, user }: UserSession
  ) {
    return await this.service.deleteCompany(id, user);
  }

  // @Put('/approveSolvency/:id')
  // async approveSolvency(
  //   @Param('id', IntParam) id: number,
  //   @Body() body: { solvencyApproved: boolean },
  //   @Request() req: ExpressRequest,
  //   @CurrentUserSession() { session, user }: UserSession
  // ) {
  //   return await this.service.approveSolvency(id, body, user);
  // }

  // @Put('/disapproveSolvency/:id')
  // async disapproveSolvency(
  //   @Param('id', IntParam) id: number,
  //   @Body() body: { solvencyApproved: boolean },
  //   @Request() req: ExpressRequest,
  //   @CurrentUserSession() { session, user }: UserSession
  // ) {
  //   return await this.service.disapproveSolvency(id, body, user);
  // }

  // @Put('/approveInsurance/:id')
  // async approveInsurance(
  //   @Param('id', IntParam) id: number,
  //   @Body() body: { insuranceApproved: boolean },
  //   @Request() req: ExpressRequest,
  //   @CurrentUserSession() { session, user }: UserSession
  // ) {
  //   return await this.service.approveInsurance(id, body, user);
  // }

  // @Put('/disapproveInsurance/:id')
  // async disapproveInsurance(
  //   @Param('id', IntParam) id: number,
  //   @Body() body: { insuranceApproved: boolean },
  //   @Request() req: ExpressRequest,
  //   @CurrentUserSession() { session, user }: UserSession
  // ) {
  //   return await this.service.disapproveInsurance(id, body, user);
  // }

  // @UseInterceptors(FilesInterceptor('files'))
  // @Post('/documents/:companyId')
  // async addCompanyDocument(
  //   @Param('companyId', IntParam) companyId: number,
  //   @UploadedFiles(new FilePipe(['PDF', 'WORD']))
  //   files: Express.Multer.File[],
  //   @Request() req: ExpressRequest,
  //   @CurrentUserSession() { session, user }: UserSession
  // ) {
  //   return await this.service.addCompanyDocument(companyId, files, user);
  // }

  // @Put('/documents/:id')
  // async updateCompanyDocument(
  //   @Param('id', IntParam) id: number,
  //   @Body() body: { name: string },
  //   @Request() req: ExpressRequest,
  //   @CurrentUserSession() { session, user }: UserSession
  // ) {
  //   return await this.service.updateCompanyDocument(id, body, user);
  // }

  // @Delete('/documents/:id')
  // async deleteCompanyDocument(@Param('id', IntParam) id: number) {
  //   return await this.service.deleteCompanyDocument(id);
  // }

  @Post('/:id/kyc/approve')
  async approveCompanyKYC(
    @Param('id', IntParam) id: number,
    @CurrentUserSession() { session, user }: UserSession
  ) {
    const company = await this.service.approveCompanyKYC(id, user);
    return Success('Succesvol KYC goedgekeurd', company);
  }
}

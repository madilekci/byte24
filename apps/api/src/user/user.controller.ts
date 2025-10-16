import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Post,
  Put,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Request as ExpressRequest } from 'express';
import { UserService } from './user.service';

import { AuthGuard } from '@/auth/auth.guard';
import { UserSession } from '@/auth/auth.type';
import { CurrentUserSession, PublicAuth } from '@/auth/decorators';
import { SearchDto, SuccessDto, SuccessList } from '@byte24/api/dto';
import { FilePipe, Success } from '@byte24/api/general';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApplicationRole, User } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllUsersDto } from './dto/all-users.dto';

@Controller('/users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  @PublicAuth()
  @Get('/generate-password')
  async generatePassword(@Query() params: { password: string }): Promise<SuccessDto> {
    const password = await this.userService.generatePassword(params.password);
    return Success('Wachtwoord is gegenereerd.', {
      password,
    });
  }

  @Get('/me')
  async GetLoggedInUser(
    @Request() request: ExpressRequest,
    @CurrentUserSession() { session, user }: UserSession
  ): Promise<SuccessDto> {
    this.logger.log('GetLoggedInUser', {
      session,
      user,
    });

    const fullUser = user as User;
    return {
      message: 'Je bent ingelogd.',
      session,
      user: {
        ...user,
        role: fullUser?.applicationRole as ApplicationRole,
      },
    };
  }

  @UseInterceptors(FilesInterceptor('file'))
  @Post('/avatar')
  async addProjectTask(
    @UploadedFiles(new FilePipe(['IMAGE'], false, false))
    files: Express.Multer.File[],
    @CurrentUserSession() { session, user }: UserSession
  ): Promise<void> {
    await this.userService.addAvatar(user.id, files[0]);
    return;
  }

  @Get('/all')
  async getAllUsers(@Query() body: AllUsersDto): Promise<SuccessList<Partial<User>>> {
    return await this.userService.getAllUsers(body);
  }

  @Get('/list')
  async getListUsers(@Query() query: SearchDto) {
    return await this.userService.getListUsers(query);
  }

  @Put('/application-role/:id')
  async setApplicationRole(
    @Param('id') id: string,
    @Body() body: { applicationRole: ApplicationRole }
  ): Promise<SuccessDto> {
    const user = await this.userService.setApplicationRole(id, body.applicationRole);
    return Success('Applicatie rol is gewijzigd.', {
      user,
    });
  }
}

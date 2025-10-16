import { SelectOption } from '@byte24/api';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { DataTableView } from '@prisma/client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';

@Injectable()
export class GeneralService {
  constructor(
    private prisma: PrismaService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  async testLogging() {
    this.logger.log('Test logging activated!');
    this.logger.error('Test logging activated!');
    return {
      message: 'Test logging activated!',
    };
  }

  async getVatCodes(): Promise<SelectOption[]> {
    const vatCodes = await this.prisma.vatCode.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return vatCodes?.map((vatCode) => {
      return {
        id: vatCode.id,
        name: vatCode?.name,
        meta: {
          rate: vatCode?.rate,
          percentage: vatCode?.percentage,
        },
      };
    });
  }

  async getDataTableViews(screenTitle: string, userId: string): Promise<DataTableView[]> {
    const dataTableViews = await this.prisma.dataTableView.findMany({
      where: {
        screenTitle,
        OR: [
          {
            createdById: userId,
          },
          {
            isShared: true,
          },
        ],
      },
      include: {
        defaultViewUsers: {
          where: {
            id: userId,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return dataTableViews.map((dataTableView) => {
      return {
        ...dataTableView,
        defaultView: dataTableView.id === dataTableView.defaultViewUsers?.[0]?.defaultViewId,
        isOwner: dataTableView.createdById === userId,
      };
    });
  }

  async createDataTableView(
    screenTitle: string,
    data: CreateViewDto,
    userId: string
  ): Promise<DataTableView> {
    return await this.prisma.dataTableView.create({
      data: {
        screenTitle,
        name: data.name,
        params: data.params,
        columnPreferences: data.columnPreferences,
        createdByName: 'Luc Swart',
        createdBy: {
          connect: {
            id: userId,
          },
        },
        isShared: data.isShared ?? false,
      },
    });
  }

  async updateDataTableView(
    screenTitle: string,
    data: UpdateViewDto,
    userId: string
  ): Promise<DataTableView> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (data.defaultView && user.defaultViewId !== data.id) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          defaultViewId: data.id,
        },
      });
    } else if (!data.defaultView && user.defaultViewId === data.id) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          defaultViewId: null,
        },
      });
    }

    return await this.prisma.dataTableView.update({
      where: {
        id: data.id,
        name: data.name,
      },
      data: {
        params: data.params,
        columnPreferences: data.columnPreferences,
        isShared: data.isShared,
      },
    });
  }

  async deleteDataTableView(id: string, userId: string): Promise<DataTableView> {
    return await this.prisma.dataTableView.delete({
      where: {
        id,
        createdById: userId,
      },
    });
  }
}

import {
  Filters,
  OrderBy,
  Pagination,
  Search,
  SearchDto,
  SelectOption,
  SuccessList,
} from '@byte24/api';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ContactPerson } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Condition } from 'src/utils/condition-filters';
import { AddContactPersonDto } from './dto/add-contact-person.dto';
import { AllContactPersonsDto } from './dto/all-contact-persons.dto';
import { UpdateContactPersonDto } from './dto/update-contact-person.dto';
import { User } from 'better-auth/types';

@Injectable()
export class ContactPersonService {
  constructor(private prisma: PrismaService) {}

  async addContactPerson(body: AddContactPersonDto, byUser: User) {
    if (body.isMainContactPerson) {
      await this.prisma.contactPerson.updateMany({
        where: {
          companyId: body.companyId,
          isMainContactPerson: true,
        },
        data: { isMainContactPerson: false },
      });
    }

    const contactPerson = await this.prisma.contactPerson.create({
      data: {
        ...body,
        createdById: byUser.id,
        updatedById: byUser.id,
      },
      include: {
        company: true,
      },
    });

    return contactPerson;
  }

  async updateContactPerson(id: number, body: UpdateContactPersonDto, byUser: User) {
    const contactPerson = await this.getContactPerson(id);

    const updatedContactPerson = await this.prisma.$transaction(async (trx) => {
      if (body.isMainContactPerson) {
        await trx.contactPerson.updateMany({
          where: {
            companyId: contactPerson.companyId,
            isMainContactPerson: true,
          },
          data: { isMainContactPerson: false, mainCompanyId: null },
        });
      }

      return await trx.contactPerson.update({
        where: { id },
        data: {
          ...body,
          updatedAt: new Date(),
          mainCompanyId: body.isMainContactPerson ? contactPerson.companyId : null,
        },
        include: {
          company: true,
        },
      });
    });

    return updatedContactPerson;
  }

  async getCompanyContactPersons(id: number): Promise<ContactPerson[]> {
    return await this.prisma.contactPerson.findMany({
      where: {
        companyId: id,
      },
    });
  }

  async getAllContactPersons(
    query: AllContactPersonsDto,
    rawQuery: string
  ): Promise<SuccessList<ContactPerson>> {
    const { companyId } = query ?? {};

    const conditions = Condition(rawQuery, [
      { field: 'title' },
      { field: 'createdAt' },
      { field: 'updatedAt' },
    ]);

    const { orderBy } = OrderBy(query, [
      {
        key: 'initials',
        fields: ['initials'],
      },
      {
        key: 'title',
        fields: ['title'],
      },
      {
        key: 'preferredName',
        fields: ['preferredName'],
      },
      {
        key: 'lastName',
        fields: ['lastName'],
      },
      {
        key: 'phone',
        fields: ['phone'],
      },
      {
        key: 'email',
        fields: ['email'],
      },
      {
        key: 'isMainContactPerson',
        fields: ['isMainContactPerson'],
      },
    ]);

    const { pagination } = Pagination(query);

    const search = Search(query, [
      { field: 'initials' },
      { field: 'preferredName' },
      { field: 'lastName' },
      { field: 'infix' },
      { field: 'email' },
      { field: 'phone' },
      { field: 'title' },
    ]);

    const filters = Filters(search, [
      {
        when: companyId ? true : false,
        filter: {
          companyId,
        },
      },
    ]);

    const totalRows = await this.prisma.contactPerson.count({
      where: {
        ...filters,
      },
    });

    const contactPersons = await this.prisma.contactPerson.findMany({
      orderBy: [...orderBy],
      ...pagination,
      where: {
        ...filters,
        ...conditions,
      },
    });

    return {
      totalRows,
      data: contactPersons,
    };
  }

  async getAllContactPersonsList(): Promise<ContactPerson[]> {
    return await this.prisma.contactPerson.findMany({
      orderBy: [{ lastName: 'asc' }],
    });
  }

  async listAllContactPersonsByCompany(companyId: number): Promise<ContactPerson[]> {
    return await this.prisma.contactPerson.findMany({
      where: {
        companyId,
      },
      orderBy: [
        {
          isMainContactPerson: 'desc',
        },
        {
          lastName: 'asc',
        },
      ],
    });
  }

  async getContactPersonsList(companyId: number, query: SearchDto): Promise<SelectOption[]> {
    const search = Search(query, [
      { field: 'title' },
      { field: 'initials' },
      { field: 'infix' },
      { field: 'lastName' },
      { field: 'preferredName' },
      { field: 'email' },
      { field: 'phone' },
    ]);

    const take = 50;

    const filters = Filters(search, [
      {
        when: companyId ? true : false,
        filter: {
          companyId,
        },
      },
    ]);

    const contactPersons = await this.prisma.contactPerson.findMany({
      where: {
        ...filters,
      },
      orderBy: [{ lastName: 'asc' }],
      take,
    });

    return contactPersons?.map((contactPerson) => {
      return {
        id: contactPerson.id,
        name: `${contactPerson?.title} - ${contactPerson?.initials ?? ''} ${contactPerson?.infix ?? ''} ${contactPerson.lastName ?? ''}`?.replace(
          '  ',
          ''
        ),
        meta: {
          email: contactPerson.email,
        },
      };
    });
  }

  async deleteContactPerson(id: number, byUser: User): Promise<ContactPerson> {
    const contactPerson = await this.getContactPerson(id);

    await this.prisma.contactPerson.delete({
      where: { id },
    });

    return contactPerson;
  }

  async getContactPerson(id: number) {
    const contactPerson = await this.prisma.contactPerson.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!contactPerson) throw new NotFoundException('Contactpersoon is niet gevonden.');

    return contactPerson;
  }
}

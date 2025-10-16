import {
  Filters,
  OrderBy,
  Pagination,
  Search,
  SelectOption,
  Success,
  SuccessList,
} from '@byte24/api';
import { ConflictException, Injectable } from '@nestjs/common';
import { ApplicationRole, Company, Prisma } from '@prisma/client';
import { User } from 'better-auth/types';
import { PrismaService } from 'src/prisma/prisma.service';
import { Condition } from 'src/utils/condition-filters';
import { AllCompanysDto } from './dto/all-company.dto';
import { ListCompaniesDto } from './dto/company-list.dto';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  // COMMON=
  async getAllStatus() {
    return await this.prisma.companyStatus.findMany();
  }

  async getAllTypes() {
    return await this.prisma.companyType.findMany();
  }

  async getAllCountries() {
    return await this.prisma.country.findMany();
  }

  // COMPANY GETTERS
  async getAllCompanies(query: AllCompanysDto, rawQuery: string): Promise<SuccessList<Company>> {
    const { status, type } = query ?? {};

    const conditions = Condition(rawQuery, [
      { field: 'name' },
      { field: 'city' },
      { field: 'country' },
      { field: 'createdAt' },
      { field: 'updatedAt' },
    ]);

    const { orderBy } = OrderBy(query, [
      {
        key: 'name',
        fields: ['name'],
      },
    ]);

    const { pagination } = Pagination(query as any);

    const search = Search(query, [
      { field: 'name' },
      { field: 'street' },
      { field: 'houseNumber' },
      { field: 'zipCode' },
      { field: 'city' },
      { field: 'country' },
      { field: 'email' },
      { field: 'phone' },
      { field: 'website' },
      { field: 'vatNumber' },
      { field: 'cocNumber' },
      { field: 'iban' },
    ]);

    const filters = Filters(search, [
      {
        when: status?.length > 0,
        filter: {
          currentStatus: {
            statusId: { in: status },
          },
        },
      },
      {
        when: type?.length > 0,
        filter: {
          typeId: {
            in: type,
          },
        },
      },
    ]);

    const [totalRows, companys] = await Promise.all([
      this.prisma.company.count({
        where: {
          ...filters,
        },
      }),
      this.prisma.company.findMany({
        orderBy: [...orderBy],
        ...pagination,
        where: {
          ...filters,
          ...conditions,
        },
        include: {
          country: true,
          type: true,
          currentStatus: {
            include: {
              status: true,
            },
          },
          createdBy: true,
          updatedBy: true,
        },
      }),
    ]);

    return {
      totalRows,
      data: companys,
    };
  }

  async getCompanyList(query: ListCompaniesDto): Promise<SelectOption[]> {
    const search = Search(query, [
      { field: 'name' },
      { field: 'invoiceEmail' },
      { field: 'city' },
      { field: 'zipCode' },
      { field: 'street' },
      { field: 'houseNumber' },
      { field: 'invoiceCity' },
      { field: 'invoiceZipCode' },
      { field: 'invoiceStreet' },
      { field: 'invoiceHouseNumber' },
      { field: 'email' },
    ]);

    const take = 50;

    const filters = Filters(search, [
      {
        when: true,
        filter: {
          currentStatus: {
            status: {
              isCompleted: true,
            },
          },
        },
      },
      {
        when: query?.typeIds?.length > 0,
        filter: { typeId: { in: query?.typeIds } },
      },
      {
        when: query?.isCustomer === true,
        filter: { type: { isCustomer: true } },
      },
      {
        when: query?.isSupplier === true,
        filter: { type: { isSupplier: true } },
      },
    ]);

    const companies = await this.prisma.company.findMany({
      where: { ...filters },
      orderBy: [{ name: 'asc' }],
      take,
    });

    const companyIds = companies?.map((company) => company.id);

    const toAddCompanies = !query?.includedCompanyIds
      ? []
      : query?.includedCompanyIds.filter((companyId) => !companyIds.includes(companyId));
    const includedCompanies = toAddCompanies
      ? await this.prisma.company.findMany({
          where: { id: { in: toAddCompanies } },

          orderBy: [{ name: 'asc' }],
        })
      : null;

    return [...(includedCompanies ? includedCompanies : []), ...companies]?.map((company) => {
      return { id: company.id, name: company?.name, meta: {} };
    });
  }

  async getCompanyById(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        currentStatus: {
          include: {
            status: true,
          },
        },
        type: true,
        createdBy: {
          select: {
            name: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        updatedBy: {
          select: {
            name: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        _count: {
          select: {
            contactPersons: true,
          },
        },
        statusHistory: {
          include: {
            status: true,
            createdBy: {
              select: {
                name: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    // throw if it was not found
    if (!company)
      throw new ConflictException('De company die u probeert op te halen, is niet gevonden.');

    return company;
  }

  // DOCUMENTS GETTER
  // async getCompanyDocumentsById(query: AllDocumentsDTO, companyId: number) {
  //   const { pagination } = Pagination(query);
  //   const search = Search(query, [
  //     {
  //       field: "name",
  //     },
  //   ]);

  //   const filters = Filters(search, [
  //     {
  //       when: true,
  //       filter: {
  //         companyId,
  //       },
  //     },
  //   ]);

  //   const companyDocuments = await this.prisma.companyDocument.findMany({
  //     ...pagination,
  //     where: {
  //       ...filters,
  //     },
  //     include: {
  //       createdBy: true,
  //       updatedBy: true,
  //     },
  //     orderBy: [{ createdAt: "desc" }, { updatedAt: "desc" }],
  //   });

  //   return companyDocuments;
  // }

  // COMPANY
  async addCompany(body: CompanyDto, user: User) {
    const { name, countryId, typeId, statusId, email, phone, website, ...rest } = body;

    // create new company
    const company = await this.prisma.company.create({
      data: {
        name,
        email,
        phone,
        website,
        street: rest.street,
        houseNumber: rest.houseNumber,
        zipCode: rest.zipCode,
        city: rest.city,
        vatNumber: rest.vatNumber,
        cocNumber: rest.cocNumber,
        iban: rest.iban,
        paymentDays: rest.paymentDays,
        invoiceEmail: rest.invoiceEmail,
        invoiceStreet: rest.invoiceStreet,
        invoiceHouseNumber: rest.invoiceHouseNumber,
        invoiceZipCode: rest.invoiceZipCode,
        invoiceCity: rest.invoiceCity,
        environmentalCharge: rest.environmentalCharge,
        countryId,
        typeId,
        invoiceCountryId: rest.invoiceCountryId,
        createdById: user.id,
      },
    });

    await this.prisma.companyStatusHistory.create({
      data: {
        companyId: company.id,
        currentCompanyId: company.id,
        statusId: statusId,
        createdById: user.id,
      },
    });

    const mainContactPersons = rest?.contactPersons?.filter((person) => person.isMainContactPerson);

    if (mainContactPersons?.length > 1)
      throw new ConflictException(
        'Er kan maar één contactpersoon als hoofdcontactpersoon worden geselecteerd.'
      );

    // create contact persons if they exist
    if (rest?.contactPersons?.length > 0) {
      await this.prisma.contactPerson.createMany({
        data: rest.contactPersons.map((person) => ({
          companyId: company.id,
          title: person.title,
          initials: person.initials,
          lastName: person.lastName,
          email: person.email,
          phone: person.phone,
          isMainContactPerson: person.isMainContactPerson,
          mainCompanyId: company.id,
          createdById: user.id,
          updatedById: user.id,
        })),
      });
    }

    return Success(`Succesvol een nieuw bedrijf aangemaakt.`, { company });
  }

  async updateCompany(id: number, body: CompanyDto, user: User) {
    const { name, countryId, typeId, statusId, email, phone, website, ...rest } = body;

    // check if line exists
    const company = await this.prisma.company.findFirst({
      where: { id },
      include: {
        type: true,
        currentStatus: {
          include: {
            status: true,
          },
        },
      },
    });

    // throw if it was not found
    if (!company)
      throw new ConflictException('Het bedrijf die u probeert bij te werken is niet gevonden.');

    const updateBody: Prisma.CompanyUpdateArgs['data'] = {
      name,
      email,
      phone,
      website,
      street: rest.street,
      houseNumber: rest.houseNumber,
      zipCode: rest.zipCode,
      city: rest.city,
      environmentalCharge: rest.environmentalCharge,
      vatNumber: rest.vatNumber,
      cocNumber: rest.cocNumber,
      iban: rest.iban,
      paymentDays: rest.paymentDays,
      invoiceEmail: rest.invoiceEmail,
      invoiceStreet: rest.invoiceStreet,
      invoiceHouseNumber: rest.invoiceHouseNumber,
      invoiceZipCode: rest.invoiceZipCode,
      invoiceCity: rest.invoiceCity,
      countryId,
      typeId,
      invoiceCountryId: rest.invoiceCountryId,
      updatedById: user.id,
      updatedAt: new Date(),
    };

    const fullUser = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (
      body?.vatCodeId &&
      body?.vatCodeId !== company?.vatCodeId &&
      fullUser?.applicationRole !== ApplicationRole.USER
    ) {
      const vatCode = await this.prisma.vatCode.findUnique({
        where: { id: body?.vatCodeId },
      });

      if (!vatCode) {
        throw new ConflictException('De BTW code die u probeert toe te voegen is niet gevonden.');
      }

      updateBody.vatCodeId = body?.vatCodeId;
    }

    // update company
    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: updateBody,
    });

    if (body?.statusId && company?.currentStatus?.statusId !== body?.statusId) {
      await this.prisma.companyStatusHistory.updateMany({
        where: {
          companyId: id,
          currentCompanyId: id,
        },
        data: {
          currentCompanyId: null,
        },
      });

      await this.prisma.companyStatusHistory.create({
        data: {
          companyId: id,
          statusId: body.statusId,
          currentCompanyId: id,
          createdById: user.id,
        },
      });

      const status = await this.prisma.companyStatus.findUnique({
        where: { id: body.statusId },
      });

      if (status?.isCompleted && updatedCompany?.kycCheck === false) {
        const superAdmins = await this.prisma.user.findMany({
          where: {
            applicationRole: ApplicationRole.SUPER_ADMIN,
          },
        });
      }
    }

    return Success(`Succesvol bedrijf bijgewerkt.`, {
      updatedCompany,
    });
  }

  async deleteCompany(id: number, byUser: User) {
    // check if line exists
    const company = await this.prisma.company.findFirst({
      where: { id },
    });

    // throw if it was not found
    if (!company)
      throw new ConflictException('Het bedrijf die u probeert te verwijderen is niet gevonden.');

    await this.prisma.contactPerson.deleteMany({
      where: { companyId: id },
    });

    // create new line
    const deletedCompany = await this.prisma.company.delete({
      where: { id },
    });

    return Success(`Succesvol bedrijf verwijderd.`, {
      deletedCompany,
    });
  }

  async approveCompanyKYC(id: number, user: User) {
    const company = await this.getCompanyById(id);

    if (!company?.currentStatus?.status?.isCompleted) {
      throw new ConflictException('De company is nog niet in een afgeronde status.');
    }

    const updatedCompany = await this.prisma.company.update({
      where: { id },
      data: {
        kycCheck: true,
      },
    });

    return Success(`Succesvol bedrijf KYC goedgekeurd.`, {
      updatedCompany,
    });
  }

  async getCompanyMetadata(id: number): Promise<Partial<Company>> {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return company;
  }
}

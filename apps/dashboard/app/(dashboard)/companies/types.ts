import {
  Company,
  CompanyContract,
  CompanyStatus,
  CompanyStatusHistory,
  CompanyType,
  ContactPerson,
  Country,
  FileSystemItem,
  User
} from '@prisma/client';

export type FullCountry = Country & {};

export type FullCompany = Company & {
  type: CompanyType;
  statusHistory?: CompanyStatusHistory[];
  currentStatus: CompanyStatusHistory & {
    status: CompanyStatus
  };
  country: FullCountry;
  createdBy?: User;
  updatedBy?: User;
  _count: {
    contactPersons: number;
  }
};

export type CompanyFormValues = {
  name: string;
  countryId: number;
  statusId: number;
  typeId: number;
  email: string;
  phone: string;
  website: string;
  contactPersons:
    | {
        isMainContactPerson: boolean;
        infix: string;
        initials: string;
        lastName: string;
        preferredName: string;
        phone: string;
        title: string;
        email: string;
      }[]
    | [];
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  vatNumber?: string;
  cocNumber?: string;
  iban?: string;
  paymentDays?: number;
  invoiceEmail?: string;
  invoiceStreet?: string;
  invoiceHouseNumber?: string;
  invoiceZipCode?: string;
  invoiceCity?: string;
  invoiceCountryId?: number;
  environmentalCharge?: boolean;
  pricelistId?: number | null;
  vatCodeId?: number | null;
};

export type FullContactPerson = ContactPerson & {
  company: FullCompany;
  createdBy: User;
  updatedBy?: User;
};

export interface CompanyDetailPageProps {
  company: FullCompany;
}

export type FullCompanyContract = CompanyContract & {
  fileSystemItem: FileSystemItem;
  createdBy?: User;
  updatedBy?: User;
};
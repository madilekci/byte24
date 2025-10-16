import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";

import { AuthGuard } from "@/auth/auth.guard";
import { UserSession } from "@/auth/auth.type";
import { CurrentUserSession } from "@/auth/decorators";
import { IntParam } from "@byte24/api";
import {
  SearchDto,
  SelectOption,
  SuccessDto,
  SuccessList,
} from "@byte24/api/dto";
import { Success } from "@byte24/api/general";
import { ContactPerson } from "@prisma/client";
import { ContactPersonService } from "./contact-person.service";
import { AddContactPersonDto } from "./dto/add-contact-person.dto";
import { AllContactPersonsDto } from "./dto/all-contact-persons.dto";
import { UpdateContactPersonDto } from "./dto/update-contact-person.dto";

@Controller("contact-person")
@UseGuards(AuthGuard)
export class ContactPersonController {
  constructor(private service: ContactPersonService) {}

  @Get("/all")
  async getAllContactPersons(
    @Query() rawQuery: string,
    @Query() query: AllContactPersonsDto
  ): Promise<SuccessList<ContactPerson>> {
    return await this.service.getAllContactPersons(query, rawQuery);
  }

  @Get("/all/list")
  async getAllContactPersonsList(): Promise<ContactPerson[]> {
    return await this.service.getAllContactPersonsList();
  }

  @Get("/company/:id/list-all")
  async getAllContactPersonsListSelect(
    @Param("id", IntParam) id: number
  ): Promise<ContactPerson[]> {
    return await this.service.listAllContactPersonsByCompany(id);
  }

  @Get("/company/:id/list")
  async getContactPersonsList(
    @Param("id", IntParam) id: number,
    @Query() query: SearchDto
  ): Promise<SelectOption[]> {
    return await this.service.getContactPersonsList(id, query);
  }

  @Post()
  async addContactPerson(
    @Body() body: AddContactPersonDto,
    @CurrentUserSession() { user }: UserSession
  ): Promise<SuccessDto> {
    const contactPerson = await this.service.addContactPerson(body, user);
    return Success("Contactpersoon succesvol toegevoegd", {
      contactPerson,
    });
  }

  @Get("/company/:id")
  async getCompanyContactPersons(
    @Param("id", IntParam) id: number
  ): Promise<ContactPerson[]> {
    return await this.service.getCompanyContactPersons(id);
  }

  @Put("/:id")
  async updateContactPerson(
    @Param("id", IntParam) id: number,
    @Body() body: UpdateContactPersonDto,
    @CurrentUserSession() { user }: UserSession
  ): Promise<SuccessDto> {
    const contactPerson = await this.service.updateContactPerson(id, body, user);

    return Success("Contactpersoon succesvol bijgewerkt", {
      contactPerson,
    });
  }

  @Get("/:id")
  async getContactPerson(
    @Param("id", IntParam) id: number
  ): Promise<ContactPerson> {
    return await this.service.getContactPerson(id);
  }

  @Delete("/:id")
  async deleteContactPerson(
    @Param("id", IntParam) id: number,
    @CurrentUserSession() { user }: UserSession
  ): Promise<SuccessDto> {
    const contactPerson = await this.service.deleteContactPerson(id, user);

    return Success("Contactpersoon succesvol verwijderd", {
      contactPerson,
    });
  }
}

import { AuthService } from "@/auth/auth.service";
import {
  Filters,
  OrderBy,
  Pagination,
  S3APIService,
  Search,
  SearchDto,
  SelectOption,
  SuccessList,
} from "@byte24/api";
import { BadRequestException, Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { ApplicationRole, Prisma, User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AllUsersDto } from "./dto/all-users.dto";
import { SelectOptionApi } from "@/types";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService
  ) {}

  protected _s3 = new S3APIService({
    region: process.env.AWS_BUCKET_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    bucketName: process.env.AWS_BUCKET_NAME,
    prefix: process.env.NODE_ENV !== "production" ? "staging/" : "",
  });

  async generatePassword(password: string) {
    const ctx = await this.auth.instance.$context;
    const hash = await ctx.password.hash(password);
    return hash;
  }

  async getAllUsers(query: AllUsersDto): Promise<SuccessList<Partial<User>>> {
    const { orderBy } = OrderBy(query, [
      {
        key: "firstName",
        fields: ["firstName"],
      },
      {
        key: "lastName",
        fields: ["lastName"],
      },
      {
        key: "company",
        fields: ["name"],
        relations: ["company"],
      },
      {
        key: "createdAt",
        fields: ["createdAt"],
      },
    ]);

    const { pagination } = Pagination(query);

    const search = Search(query, [
      { field: "firstName" },
      { field: "lastName" },
      { field: "name", relations: ["company"] },
    ]);

    const filters = Filters(search, [
      {
        when: true,
        filter: {
          deleted: false,
        },
      },
    ]);

    const totalRows = await this.prisma.user.count({
      where: {
        ...filters,
      },
    });

    const users = await this.prisma.user.findMany({
      orderBy: [...orderBy],
      ...pagination,
      where: {
        ...filters,
      },
    });

    return {
      totalRows,
      data: users,
    };
  }

  async getListUsers(query: SearchDto): Promise<SelectOptionApi[]> {
    const search = Search(query, [
      { field: "name" },
      { field: "firstName" },
      { field: "lastName" },
      { field: "email" },
    ]);

    const take = 50;

    const filters = Filters(search, []);

    const users = await this.prisma.user.findMany({
      where: { ...filters },
      orderBy: [{ name: "asc" }],
      take,
    });

    return users?.map((user) => {
      return { id: user.id, name: user?.name, meta: { email: user?.email } };
    });
  }

  async addAvatar(userId: string, file: Express.Multer.File) {
    const result = await this._s3.uploadFile({
      file,
      path: "images/avatar/",
      readFile: true,
      withType: true,
    });

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: process.env.CLOUDFRONT_URL + "/" + result.Key,
      },
    });
  }

  async getUserMetadata(id: number): Promise<any> {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id,
    //   },
    //   select: {
    //     id: true,
    //     firstName: true,
    //     lastName: true,
    //   },
    // });
    // return user;
  }

  async getUser(id: number): Promise<any> {
    //   const user = await this.prisma.user.findUnique({
    //     where: {
    //       id,
    //     },
    //   });
    //   if (!user) throw new NotFoundException('Deze gebruiker is niet gevonden.');
    //   return user;
    // }
    // async updateUser(id: number, body: UpdateUserDto) {
    //   const userExisting = await this.prisma.user.findFirst({
    //     where: { email: body.email, id: { not: id } },
    //   });
    //   if (userExisting) {
    //     throw new BadRequestException('Deze email is al in gebruik.');
    //   }
    //   const updatedUser = await this.prisma.user.update({
    //     where: { id },
    //     data: {
    //       ...body,
    //       email: body?.email?.toLowerCase(),
    //     },
    //   });
    //   return updatedUser;
  }

  async createUser(body: Prisma.UserCreateInput): Promise<void> {
    await this.prisma.user.create({
      data: body,
    });
    // const userExisting = await this.prisma.user.findFirst({
    //   where: { email: body.email },
    // });
    // if (userExisting) {
    //   throw new BadRequestException('Deze email is al in gebruik.');
    // }
    // const generatedPassword = generatePassword(12);
    // const password: string = await encodePassword(generatedPassword);
    // const user = await this.prisma.user.create({
    //   data: { ...body, password, email: body.email.toLowerCase() },
    // });
    // await this.mailQueue.add(NEW_USER_EMAIL, {
    //   name: `${body?.firstName ?? ''} ${body?.lastName ?? ''}`,
    //   email: body?.email,
    //   password,
    // });
    // delete user.password;
    // return user;
  }

  async updateUser(
    tx: Prisma.TransactionClient,
    id: string,
    body: Prisma.UserUpdateInput
  ): Promise<void> {
    await tx.user.update({
      where: { id },
      data: {
        ...body,
      },
    });
    // const userExisting = await this.prisma.user.findFirst({
    //   where: { email: body.email },
    // });
    // if (userExisting) {
    //   throw new BadRequestException('Deze email is al in gebruik.');
    // }
    // const generatedPassword = generatePassword(12);
    // const password: string = await encodePassword(generatedPassword);
    // const user = await this.prisma.user.create({
    //   data: { ...body, password, email: body.email.toLowerCase() },
    // });
    // await this.mailQueue.add(NEW_USER_EMAIL, {
    //   name: `${body?.firstName ?? ''} ${body?.lastName ?? ''}`,
    //   email: body?.email,
    //   password,
    // });
    // delete user.password;
    // return user;
  }

  async setApplicationRole(
    id: string,
    applicationRole: ApplicationRole
  ): Promise<User> {
    // check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    // throw error if user not found
    if (!user) throw new NotFoundException("Deze gebruiker is niet gevonden.");

    // check if application role is valid
    if (!Object.values(ApplicationRole).includes(applicationRole)) {
      throw new BadRequestException("Deze applicatie rol is niet geldig.");
    }

    // update user
    return await this.prisma.user.update({
      where: { id },
      data: {
        applicationRole,
        updatedAt: new Date(),
      },
    });
  }
}

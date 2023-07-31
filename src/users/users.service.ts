import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
var fs = require('fs');
var randomstring = require('randomstring');

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }


  async upload(file: Express.Multer.File) {
    let folder = process.env.FILE_FOLDER;

    console.log('folder', folder);

    try {
      if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    } catch (error) {
      console.log('Echec de la création des répertoires');
    }

    const name = `${randomstring.generate(5)}-${file.originalname}`;
    const filePath = `${folder}/${name}`;
    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }
}

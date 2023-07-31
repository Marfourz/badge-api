import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';


import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

// A voir le type Multer

@Controller('users')
export class UsersController {

    constructor(private usersService : UsersService){}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async create(
      @Body() createUserDto : Prisma.UserCreateInput,
      @UploadedFile() file: Express.Multer.File, ){
        console.log('before verify file')
        if(!file)
          throw new HttpException("Vous devez uplaoder la photo de profil", HttpStatus.BAD_REQUEST)
        console.log('after verify file')
        const filePath = await this.usersService.upload(file)
        console.log('image', filePath)
        return this.usersService.create({...createUserDto,image:filePath})
    }

    @Get()
    findAll(@Query() query ){
        return this.usersService.findAll(query)
    }

    @Get('file')
    async getFile(
        @Query() query : {path : string},
        @Res() res: Response){
        try{
            res.sendFile(query.path, { root: './' }, err => {
                if (err) {
                  res.sendStatus(404);
                }
              });
        }
        catch(error){
            throw error 
        }
    }


    




    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.usersService.findOne(+id);
    // }

    // @Patch(':id')
    // async update(
    //   @Param('id') id: number,
    //   @Body() updateUserDto: UpdateUserDto,
     
    // ) {
    //   return this.usersService.update(
    //     id,
    //     updateUserDto,

    //   )
    // }


}

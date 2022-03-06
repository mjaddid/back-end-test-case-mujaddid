import { Controller ,Post,Get,Body} from '@nestjs/common';
import { UserService } from './user.service';

import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User, Borrow ,Return} from './user.model';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService) {}

    @Post()
    @ApiOperation({ summary: 'Create new user'})
    @ApiResponse({ status: 201, description: 'User successfully created' })
    @ApiBody({type:User,description:'User object'})

    async addUser(
        @Body('code') code:string,
        @Body('name') name:string,
    ){
        const generatedUser= await this.userService.addUser(code,name);
        return {id:generatedUser};
    }

    @Get()
    @ApiOperation({ summary: 'Display all users'})
    @ApiResponse({ status: 200, description: 'User successfully Displayed'})

    async getUsers(){
        const users= await this.userService.getUsers();
        return users;
    }

    @Post('borrow')
    @ApiOperation({ summary: 'Borrow a book'})
    @ApiResponse({ status: 201, description: 'Book successfully borrowed'})
    @ApiResponse({ status: 404, description: 'Book or User not found'})
    @ApiBody({type:Borrow,description:'Borrrow a book'})

    async borrowBook(
        @Body('userCode') userCode:string,
        @Body('bookCode') bookCode:string,
    ){
        const borrowedBook= await this.userService.borrowBook(userCode,bookCode);
        return {borrowedBook};
    }

    @Post('return')
    @ApiOperation({ summary: 'Return a book'})
    @ApiResponse({ status: 201, description: 'Book successfully returned'})
    @ApiResponse({ status: 404, description: 'Book or User not found'})
    @ApiBody({type:Return,description:'Return a book'})

    async returnBook(
        @Body('userCode') userCode:string,
        @Body('bookCode') bookCode:string,
    ){
        const returnedBook= await this.userService.returnBook(userCode,bookCode);
        return {returnedBook};
    }
}

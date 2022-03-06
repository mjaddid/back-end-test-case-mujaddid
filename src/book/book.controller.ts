import { Controller, Post, Body,Get} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiBody, ApiResponse, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Book } from './book.model';


@ApiTags('books')
@Controller('book')

export class BookController {

    constructor(private readonly bookService:BookService) {}

    @Post()
    @ApiOperation({ summary: 'Create or add new book'})
    @ApiBody({type:Book,description:'Book object'})
    @ApiResponse({ status: 201, description: 'Book successfully added'})
    
    async addBook(
        @Body('code') code:string,
        @Body('title') title:string,
        @Body('author') author:string,
        @Body('stock') stock:number,
    ){
        const generatedBook= await this.bookService.insertBook(code,title,author,stock);
        return {id:generatedBook};
    }

    @Get()
    @ApiOperation({ summary: 'Display list of available books'})
    @ApiResponse({ status: 200, description: 'Book successfully Displayed' })
    async getBooks(){
        const books= await this.bookService.getBooks();
        return books;
    }

}

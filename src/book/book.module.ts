import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { bookSchema } from "./book.model";

@Module({
    imports: [MongooseModule.forFeature([{ name: "Book", schema: bookSchema }])],
    controllers: [BookController],
    providers: [BookService]
})

export class BookModule{}
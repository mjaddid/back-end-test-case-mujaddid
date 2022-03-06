import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { bookSchema,borrowSchema } from "src/book/book.model";
import { BookModule } from "src/book/book.module";
import { UserController } from "./user.controller";
import { userSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: "User", schema: userSchema },{name:"Book",schema:bookSchema},{name:"Borrow",schema:borrowSchema}]),BookModule],
    controllers: [UserController],
    providers: [UserService],
})

export class UserModule{}
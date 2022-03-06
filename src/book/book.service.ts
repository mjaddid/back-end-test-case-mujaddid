import { Injectable , NotFoundException} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book } from "./book.model";

@Injectable()
export class BookService{
    private books:Book[]=[];

    constructor(@InjectModel('Book') private readonly bookModel:Model<Book>){}

    async insertBook(code:string,title:string,author:string,stock:number){
        const newBook= new this.bookModel({code:code,title:title,author:author,stock:stock});
        const result = await newBook.save().then();
        return result.code as string;
    }

    async getBooks(){
        const result = await this.bookModel.find({stock:{$gte:1}}).exec();
        return result.map((book)=>({code:book.code,title:book.title,author:book.author,stock:book.stock}));
    }
    
}
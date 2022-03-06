import { Injectable, Post, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";
import { Book, Borrow } from "src/book/book.model";


@Injectable()
export class UserService {
    private users: User[] = [];
    private book: Book[] = [];
    private borrow: Borrow[] = [];

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @InjectModel('Book') private readonly bookModel: Model<Book>,
        @InjectModel('Borrow') private readonly borrowModel: Model<Borrow>
        ) {}
    @Post()
    async addUser(code: string, name: string) {
        const newUser = new this.userModel({ code: code, name: name, borrowedBooks:0});
        const result = await newUser.save().then();
        return result.code as string;
    }

    async getUsers() {
        const result = await this.userModel.find().exec();
        return result.map((user) => ({ code: user.code, name: user.name, borrowedBooks: user.borrowedBooks,penaltyDue:user.penaltyDue }));
    }

    private async findUser(code: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.find({code:code}).exec();
        } catch (error) {
            throw new NotFoundException('Could not find user.');
        }
        if (!user) {
            throw new NotFoundException('Could not find user.');
        }
        return user;
    }

    private async getBook(code:string){
        let book;
        try {
            book = await this.bookModel.find({code:code}).exec();
        } catch (error) {
            throw new NotFoundException('Could not find book.');
        }
        if (!book) {
            throw new NotFoundException('Could not find book.');
        }
        return book;
    }

    async borrowBook(userCode: string, bookCode: string) {
        const today = new Date();
        
        const user = await this.findUser(userCode);
        const book = await this.getBook(bookCode);

        // return today>user[0].penaltyDue;
        if (user[0].borrowedBooks >= 2) {
            throw new NotFoundException('User has already borrowed 2 books');
        }
        else if(today<user[0].penaltyDue){
            throw new NotFoundException('User has a penalty until '+user[0].penaltyDue);
        }
        else if(book[0].stock == 0){
            throw new NotFoundException('Book is out of stock');
        }
        else{
            const newBorrow = new this.borrowModel({ userCode: userCode, bookCode: bookCode, dueDate: today.setDate(today.getDate() + 7) });
            const result = await newBorrow.save();
            const updateUser = await this.userModel.updateOne({ code: userCode }, { borrowedBooks: user[0].borrowedBooks + 1}).exec();
            const updateBook = await this.bookModel.updateOne({ code: bookCode }, { stock: book[0].stock - 1 }).exec();
            
            return result;
        }
    }

    async returnBook(userCode: string, bookCode: string) {
        const today = new Date();
        const user = await this.findUser(userCode);
        const book = await this.getBook(bookCode);
        const borrow = await this.borrowModel.find({ userCode: userCode, bookCode: bookCode }).exec();
        let isLate = false;

        if (!user[0]||!book[0]||!borrow[0]) {
            throw new NotFoundException('Could not find book or user.');
        }
        if (today > borrow[0].dueDate) {
            const updateUser = await this.userModel.updateOne({code:userCode},{penaltyDue:today.setDate(today.getDate() + 3)}).exec();
            isLate = true;
        }
        
        const updateUser = await this.userModel.updateOne({code:userCode},{ borrowedBooks: user[0].borrowedBooks - 1 }).exec();
        const updateBook = await this.bookModel.updateOne({code:bookCode}, { stock: book[0].stock + 1 }).exec();
        const deleteBorrow = await this.borrowModel.deleteOne({ userCode: userCode, bookCode: bookCode }).exec();
        
        if(isLate){
            return "Book returned successfully and user has been penalized for 3 days until "+today.setDate(today.getDate() + 3);
        }else{
            return "Book returned successfully";
        }
    }
}
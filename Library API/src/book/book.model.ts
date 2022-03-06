import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';


export const bookSchema = new mongoose.Schema({
    code : {type:String,required:true},
    title : {type:String,required:true},
    author : {type:String,required:true},
    stock : {type:Number,required:true},
});

export interface Book extends mongoose.Document{
    
    code:string;
    title:string;
    author:string;
    stock:number;
    
}

export const borrowSchema = new mongoose.Schema({
    userCode : {type:String,required:true},
    bookCode : {type:String,required:true},
    dueDate : {type:Date,required:true},
});

export interface Borrow extends mongoose.Document{
    userCode:string;
    bookCode:string;
    dueDate:Date;
}

export class Book{
    @ApiProperty({example: 'JK-45', description: 'The code for the book'})
    code:string;
    @ApiProperty({example: "Javascript For Expert", description: 'The title of the book'})
    title:string;
    @ApiProperty({example: "Mujaddid", description: 'The author of the book'})
    author:string;
    @ApiProperty({example: "10", description: 'The stock of the book'})
    stock:number;
}
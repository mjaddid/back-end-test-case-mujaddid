import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    code : {type:String,required:true},
    name : {type:String,required:true},
    borrowedBooks : {type:Number,required:true},
    penaltyDue: {type:Date,default:Date.now},
});

export interface User extends mongoose.Document{
    code:string;
    name:string;
    borrowedBooks:number;
    penaltyDue:Date;
}


export class User{
    @ApiProperty({example: 'mm05', description: 'The code for the user'})
    code:string;
    @ApiProperty({example: "Mujaddid", description: 'The name of the user'})
    name:string;
    
    borrowedBooks:number;
    
    penaltyDue:Date;
    
}

export class Borrow{
    @ApiProperty({example: 'mm05', description: 'The code for the user'})
    userCode:string;
    @ApiProperty({example: "JK-45", description: 'The code for the book'})
    bookCode:string;
    
    dueDate:Date;
}

export class Return{
    @ApiProperty({example: 'mm05', description: 'The code for the user'})
    userCode:string;
    @ApiProperty({example: "JK-45", description: 'The code for the book'})
    bookCode:string;
    
    dueDate:Date;
}
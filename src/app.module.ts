import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [BookModule,UserModule,MongooseModule.forRoot('mongodb+srv://librarian:BookSooGood@testapi.vitjq.mongodb.net/dbLibrary?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

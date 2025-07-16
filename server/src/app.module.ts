import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/todo-db'), // ← адреса локальної MongoDB
    TodoModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule { }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.schema';
import { CreateTodoDto } from './create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
  ) { }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Todo | null> {
    return this.todoModel.findById(id).lean().exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const created = new this.todoModel(createTodoDto);
    const saved = await created.save();
    console.log('TODO saved to DB:', saved)
    return created.toObject();
  }

  async update(id: string, updateData: Partial<Todo>): Promise<Todo | null> {
    return this.todoModel.findByIdAndUpdate(id, updateData, { new: true }).lean().exec();
  }

  async delete(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }
}

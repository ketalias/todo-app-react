import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface'; 
import { CreateTodoDto } from './create-todo.dto';


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Get()
    async findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Todo | null> {
        return this.todoService.findOne(id);
    }

    @Post()
    async create(@Body() todo: CreateTodoDto): Promise<Todo> {
        return this.todoService.create(todo);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updated: Partial<Todo>,
    ): Promise<Todo | null> {
        return this.todoService.update(id, updated);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<void> {
        await this.todoService.delete(id);
    }
}

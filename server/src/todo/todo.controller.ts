import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoservice: TodoService) { }

    @Get('id')
    findOne(@Param('id') id: string): Todo | undefined {
        return this.todoservice.findOne(+id);
    }

    @Post()
    create(@Body() todo: Omit<Todo, 'id'>): Todo {
        return this.todoservice.create(todo);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updated: Partial<Todo>): Todo | null {
        return this.todoservice.update(+id, updated);
    }

    @Delete(':id')
    delete(@Param('id') id: string): void {
        this.todoservice.delete(+id);
    }
}

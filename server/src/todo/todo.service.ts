import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
    private todos: Todo[] = [];

    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: number): Todo | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    create(todo: Omit<Todo, 'id'>): Todo {
        const newTodo = { id: Date.now(), ...todo };
        this.todos.push(newTodo);
        return newTodo;
    }

    update(id: number, updated: Partial<Todo>): Todo | null {
        const todo = this.findOne(id);
        if (!todo) return null;
        Object.assign(todo, updated);
        return todo;
    }

    delete(id: number): void {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}

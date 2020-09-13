import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export type ITodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly http: HttpClient) {}

  readonly readAll = () =>
    this.http.get<ITodo[]>(`https://jsonplaceholder.typicode.com/todos`).pipe(map(todos => todos.slice(0, 20)));

  readonly create = (todo: ITodo) => of(todo).pipe(delay(500));

  readonly update = (todo: ITodo) => of(todo).pipe(delay(500));

  readonly delete = (todo: ITodo) => of(todo).pipe(delay(500));
}

import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { rxNext, rxStore, rxToggle } from 'rxlize';
import { ITodo, TodoService } from '../../services/todo/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  constructor(private sTodo: TodoService) {
    this.rxTodos.start();
  }

  readonly rxTodos = rxStore(
    () => this.sTodo.readAll(),
    {
      add: (state: ITodo[]) => (payload: ITodo) => [payload, ...state],
      update: (state: ITodo[]) => (payload: ITodo) => {
        const findIndex = state.findIndex(todo => todo.id === payload.id);

        if (findIndex >= 0) {
          const updated = state.slice();
          updated.splice(findIndex, 1, payload);
          return updated;
        } else return state;
      },
      remove: (state: ITodo[]) => (payload: ITodo) => state.filter(todo => todo.id !== payload.id),
    },
    { init: [] },
  );

  readonly select$ = new BehaviorSubject<'all' | 'completed' | 'active'>('all');

  readonly todoList$ = combineLatest([this.select$, this.rxTodos.store$]).pipe(
    map(([select, state]) =>
      select === 'all'
        ? state
        : { ...state, data: state.data.filter(todo => todo.completed === (select === 'completed')) },
    ),
  );

  readonly rxAdd = rxNext((obs: Observable<string>) =>
    obs.pipe(
      switchMap(title => this.sTodo.create({ userId: 0, id: Math.random(), title, completed: false })),
      tap(this.rxTodos.dispatch.add),
    ),
  );

  readonly rxUpdate = rxNext((obs: Observable<ITodo>) =>
    obs.pipe(
      switchMap((todo: ITodo) => this.sTodo.update(todo)),
      tap(this.rxTodos.dispatch.update),
    ),
  );

  readonly rxRemove = rxNext((obs: Observable<ITodo>) =>
    obs.pipe(
      switchMap((todo: ITodo) => this.sTodo.delete(todo)),
      tap(this.rxTodos.dispatch.remove),
    ),
  );

  readonly isEditing = rxToggle();

  readonly toEdit = new Subject<ITodo>();
}

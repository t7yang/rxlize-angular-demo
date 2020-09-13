import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, TodoRoutingModule, ComponentsModule],
})
export class TodoModule {}

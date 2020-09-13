import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, ComponentsModule],
})
export class UserModule {}

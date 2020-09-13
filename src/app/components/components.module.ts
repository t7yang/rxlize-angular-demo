import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, ModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, ModalComponent, RouterModule],
})
export class ComponentsModule {}

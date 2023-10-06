import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { AuthButtonComponent } from './auth-button.component';

@NgModule({
  declarations: [PaginationComponent, AuthButtonComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule,ReactiveFormsModule, PaginationComponent, AuthButtonComponent],
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { AuthButtonComponent } from './auth-button.component';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  declarations: [PaginationComponent, AuthButtonComponent, UserProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [CommonModule, FormsModule,ReactiveFormsModule, PaginationComponent, AuthButtonComponent, UserProfileComponent],
})
export class SharedModule {}

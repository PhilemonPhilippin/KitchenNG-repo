import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, PaginationComponent],
})
export class SharedModule {}

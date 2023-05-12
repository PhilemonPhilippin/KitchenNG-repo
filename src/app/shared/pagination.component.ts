import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'kc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChangeEvent = new EventEmitter<number>();
  pageNumbers: number[] = [1];
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.pageNumbers = [];
    for (let n = 1; n <= this.totalPages; n++) {
      this.pageNumbers.push(n);
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChangeEvent.emit(page);
  }

  nextPage(): void {
    if (this.currentPage + 1 <= this.pageNumbers.length) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage - 1 > 0) {
      this.onPageChange(this.currentPage - 1);
    }
  }
}

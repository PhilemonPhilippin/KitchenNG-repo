import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'kc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() pageChangeEvent = new EventEmitter<number>();
  @Output() pageSizeEvent = new EventEmitter<number>();
  pageNumbers: number[] = [];
  pageSizeOptions: number[] = [];
  pageSize: number = 5;
  constructor() {}
  
  ngOnInit(): void {
    this.pageSizeOptions = [];
    for (let n = 1; n <= 20; n++) {
      this.pageSizeOptions.push(n);
    }
  }
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

  onPageSizeChange(): void {
    this.pageSizeEvent.emit(this.pageSize);
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

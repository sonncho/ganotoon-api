export class PageMetaDto {
  readonly page: number;
  readonly size: number;
  readonly totalElements: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;

  constructor(page: number, size: number, totalElements: number) {
    this.page = page;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = Math.ceil(totalElements / size);
    this.hasNext = page < this.totalPages;
    this.hasPrevious = page > 1;
  }
}

export class PageDto<T> {
  readonly items: T[];
  readonly meta: PageMetaDto;

  constructor(items: T[], meta: PageMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}

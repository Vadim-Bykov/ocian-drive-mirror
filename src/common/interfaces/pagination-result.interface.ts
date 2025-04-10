export class PaginationResult<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  nextPage: number | null;

  constructor({
    items,
    total,
    page,
    size,
  }: {
    items: T[];
    total: number;
    page: number;
    size: number;
  }) {
    this.items = items;
    this.total = total;
    this.page = page;
    this.size = size;
    this.totalPages = Math.ceil(total / size);
    this.nextPage = page < this.totalPages ? page + 1 : null;
  }
}

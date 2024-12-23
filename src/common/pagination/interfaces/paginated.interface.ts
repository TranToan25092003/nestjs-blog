export interface Paginated<T> {
  data: T[];

  meta: {
    itemPerPage: number;
    totalItem: number;
    currentPage: number;
    totalPage: number;
  };

  links: {
    linkLastPage: string;
    linkFirstPage: string;
    linkNextPage: string;
    linkPreviousPage: string;
    linkCurrentPage: string;
  };
}

import { Inject, Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/query-pagination.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  /**
   * constructor
   */
  constructor(
    /**
     * inject request
     */
    @Inject(REQUEST) private readonly req: Request,
  ) {}

  /**
   * pagination query
   */
  public async paginatedQuery<T extends ObjectLiteral>(
    queryPagination: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const result = await repository.find({
      take: queryPagination.limit,
      skip: (queryPagination.page - 1) * queryPagination.limit,
    });

    // base URL
    const url = this.req.protocol + '://' + this.req.headers.host + '/';
    const newUrl = new URL(this.req.url, url);

    //  calculate number page
    const totalEntity: number = await repository.count();
    const totalPage: number = Math.ceil(totalEntity / queryPagination.limit);

    const nextPage: number =
      queryPagination.page === totalPage
        ? queryPagination.page
        : queryPagination.page + 1;

    const prePage: number =
      queryPagination.page === 1
        ? queryPagination.page
        : queryPagination.page - 1;

    // final result
    const fialRespone: Paginated<T> = {
      data: result,
      meta: {
        itemPerPage: queryPagination.limit,
        currentPage: queryPagination.page,
        totalItem: totalEntity,
        totalPage: totalPage,
      },
      links: {
        linkCurrentPage: `${newUrl.origin}${newUrl.pathname}?page=${queryPagination.page}&limit=${queryPagination.limit}`,
        linkFirstPage: `${newUrl.origin}${newUrl.pathname}?page=1&limit=${queryPagination.limit}`,
        linkLastPage: `${newUrl.origin}${newUrl.pathname}?page=${totalPage}&limit=${queryPagination.limit}`,
        linkNextPage: `${newUrl.origin}${newUrl.pathname}?page=${nextPage}&limit=${queryPagination.limit}`,
        linkPreviousPage: `${newUrl.origin}${newUrl.pathname}?page=${prePage}&limit=${queryPagination.limit}`,
      },
    };

    return fialRespone;
  }
}

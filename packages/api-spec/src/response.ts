/**
 * Generic response type
 */
export type Response<T> = {
  /**
   * list of errors
   */
  errors?: string[];

  /**
   * reponseo payload the actual data
   */
  payload?: T;
};

export type PaginatedResponse<T> = {
  items: T[]
  pagination: PaginationMeta
}

export type PaginationMeta = {
    page: number,
    pageSize: number,
    total: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}
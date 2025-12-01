export const DEFAULT_PAGINATION_PARAMETERS = {
    page: 1,
    pageSize: 25,
}

export type PaginationMeta = {
    page: number,
    pageSize: number,
    total: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}

export type PaginatedResult<T> = {
    items: T[],
    pagination: PaginationMeta,
}


export type PaginationQuery = {
    page?: number,
    pageSize?: number,
}

export function calculatePaginationMeta (
    page: number,
    pageSize: number,
    total: number
): PaginationMeta {
    const totalPages = Math.ceil(total / pageSize);
    
    return {
        page,
        pageSize,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
    };
};
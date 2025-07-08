import { db } from '@infrastructure/database/data-source.js'
import { bookmarks } from '@infrastructure/database/schema.js'
import { calculatePaginationMeta, DEFAULT_PAGINATION_PARAMETERS, type PaginatedResult, type PaginationQuery } from '@services/base/pagination.js'
import { isNull } from 'drizzle-orm'

// -----------------------  types  -----------------------

export type GetBookMarkParams = {
    pagination?: PaginationQuery
}

export type GetBookMarkResult = PaginatedResult<{
    id: number,
    name: string,
    url: string,
    description: string | null | undefined,
}>

// -----------------------  public api  -----------------------

export async function getBookmarks(params: GetBookMarkParams): Promise<GetBookMarkResult> {
    const pageSize = params.pagination?.pageSize ?? DEFAULT_PAGINATION_PARAMETERS.pageSize
    const page = params.pagination?.page ?? DEFAULT_PAGINATION_PARAMETERS.page
    const bookmarkList = await db.select()
        .from(bookmarks)
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .where(isNull(bookmarks.deleted_at))

    return {
        items: bookmarkList.map((bookmark) => ({
            id: bookmark.id,
            name: bookmark.name,
            url: bookmark.url,
            description: bookmark.description,
        })),
        pagination: calculatePaginationMeta(page, pageSize, bookmarkList.length),
    }
}

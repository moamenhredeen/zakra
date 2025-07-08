import { db } from '@infrastructure/database/data-source.js'
import { collections } from '@infrastructure/database/schema.js'
import { and, eq, isNull } from 'drizzle-orm'
import { calculatePaginationMeta, DEFAULT_PAGINATION_PARAMETERS, type PaginatedResult, type PaginationQuery } from '../base/pagination.js'

export type GetCollectionsParams = {
    userId: number
    pagination?: PaginationQuery
}

export type GetCollectionsResult = PaginatedResult<{
    id: number
    name: string
    description: string | null | undefined
    userId: number
    createdAt: Date
    updatedAt: Date
}>

export async function getCollections(params: GetCollectionsParams): Promise<GetCollectionsResult> {
    const pageSize = params.pagination?.pageSize ?? DEFAULT_PAGINATION_PARAMETERS.pageSize
    const page = params.pagination?.page ?? DEFAULT_PAGINATION_PARAMETERS.page
    const rows = await db
        .select()
        .from(collections)
        .where(and(eq(collections.user_id, params.userId), isNull(collections.deleted_at)))
        .limit(pageSize)
        .offset((page - 1) * pageSize)

    return {
        items: rows.map(row => ({
            id: row.id,
            name: row.name,
            description: row.description,
            userId: row.user_id,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        })),
        pagination: calculatePaginationMeta(1, 10, rows.length),
    }
}
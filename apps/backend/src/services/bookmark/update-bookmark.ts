import { bookmarks } from '@infrastructure/database/schema.js'
import { db } from '@infrastructure/database/data-source.js'
import { and, eq, isNull } from 'drizzle-orm'

// -----------------------  types  -----------------------

export type UpdateBookmarkParams = {
    id: number
    name?: string
    url?: string
    description?: string
    collectionId?: number
}

export type UpdateBookmarkResult = {
    id: number
    name: string
    url: string
    description: string | null | undefined
    collectionId: number
    createdAt: Date
    updatedAt: Date
}

// -----------------------  public api  -----------------------

export async function updateBookmark(params: UpdateBookmarkParams): Promise<UpdateBookmarkResult> {
    const rows = await db
        .update(bookmarks)
        .set({
            name: params.name ?? undefined,
            url: params.url ?? undefined,
            description: params.description ?? undefined,
            collection_id: params.collectionId ?? undefined,
        })
        .where(and(eq(bookmarks.id, params.id), isNull(bookmarks.deleted_at)))
        .returning()

    if (rows.length === 0) {
        throw new Error('Bookmark not found')
    }

    const bookmark = rows[0]
    return {
        id: bookmark.id,
        name: bookmark.name,
        url: bookmark.url,
        description: bookmark.description,
        collectionId: bookmark.collection_id,
        createdAt: bookmark.created_at,
        updatedAt: bookmark.updated_at,
    }
}
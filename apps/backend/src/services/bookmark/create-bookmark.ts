import { bookmarks } from '@infrastructure/database/schema.js'
import { db } from '@infrastructure/database/data-source.js'

// -----------------------  types  -----------------------

export type CreateBookmarkParams = {
    name: string
    url: string
    description?: string
    userId: number
    collectionId: number,
}

export type CreateBookmarkResult = {
    id: number,
    name: string,
    url: string,
    description: string | null | undefined,
    userId: number,
    collectionId: number,
    createdAt: Date,
    updatedAt: Date,
}

// -----------------------  public api  -----------------------

export async function createBookmark(params: CreateBookmarkParams): Promise<CreateBookmarkResult> {
    const rows = await db
        .insert(bookmarks)
        .values({
            name: params.name,
            url: params.url,
            description: params.description,
            user_id: params.userId,
            collection_id: params.collectionId,
        }).returning()

    if (rows.length === 0) {
        throw new Error('Failed to create bookmark')
    }
    
    const bookmark = rows[0]
    return {
        id: bookmark.id,
        name: bookmark.name,
        url: bookmark.url,
        description: bookmark.description,
        userId: bookmark.user_id,
        collectionId: bookmark.collection_id,
        createdAt: bookmark.created_at,
        updatedAt: bookmark.updated_at,
    }
}
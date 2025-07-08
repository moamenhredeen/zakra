import { bookmarks } from '@infrastructure/database/schema.js'
import { db } from '@infrastructure/database/data-source.js'
import { and, eq, isNull } from 'drizzle-orm'

// -----------------------  types  -----------------------

export type GetBookmarkByIdParams = {
    id: number
}

export type GetBookmarkByIdResult = {
    id: number
    name: string
    url: string
    description: string | null | undefined
}

// -----------------------  public api  -----------------------

export async function getBookmarkById(params: GetBookmarkByIdParams): Promise<GetBookmarkByIdResult> {
    const rows = await db
        .select()
        .from(bookmarks)
        .where(and(eq(bookmarks.id, params.id), isNull(bookmarks.deleted_at)))

    if (rows.length === 0) {
        throw new Error('Bookmark not found')
    }
    
    const bookmark = rows[0]
    return {
        id: bookmark.id,
        name: bookmark.name,
        url: bookmark.url,
        description: bookmark.description,
    }
}
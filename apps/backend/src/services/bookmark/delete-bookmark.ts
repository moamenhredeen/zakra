import { db } from '@infrastructure/database/data-source.js'
import { bookmarks } from '@infrastructure/database/schema.js'
import { and, eq, isNull } from 'drizzle-orm'


// -----------------------  public api  -----------------------

export async function deleteBookmark(id: number): Promise<void> {
    const result = await db
        .update(bookmarks)
        .set({ deleted_at: new Date() })
        .where(and(eq(bookmarks.id, id), isNull(bookmarks.deleted_at)))

    if (result.rowCount === 0) {
        throw new Error('Bookmark not found')
    }
}
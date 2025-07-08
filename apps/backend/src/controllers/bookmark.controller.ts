import { Hono } from 'hono'
import { getBookmarks } from '@services/bookmark/get-bookmarks.js'
import { CreateBookmarkRequestSchema, CreateCollectionRequestSchema, GetBookmarksRequestSchema, GetCollectionsRequestSchema, intIdParamSchema, UpdateBookmarkRequestSchema, type CreateBookmarkResponse, type CreateCollectionResponse, type DeleteBookmarkResponse, type DeleteCollectionResponse, type GetBookmarksResponse, type GetCollectionsResponse, type PaginatedResponse, type UpdateBookmarkResponse } from '@zakra/api-spec'
import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'
import { createBookmark } from '@services/bookmark/create-bookmark.js'
import { updateBookmark } from '@services/bookmark/update-bookmark.js'
import { deleteBookmark } from '@services/bookmark/delete-bookmark.js'
import { getCollections } from '@services/bookmark/get-collections.js'
import { createCollection } from '@services/bookmark/create-collection.js'
import { deleteCollection } from '@services/bookmark/delete-collection.js'

const bookmarkApp = new Hono()

bookmarkApp.get('/', zValidator('query', GetBookmarksRequestSchema), async (c) => {
    try {
        const { pagination } = c.req.valid('query')
        const bookmarks = await getBookmarks({ pagination })
        return c.json<PaginatedResponse<GetBookmarksResponse>>(bookmarks)
    } catch (err) {
        throw new HTTPException(400, { cause: err })
    }
})

bookmarkApp.post('/', zValidator('json', CreateBookmarkRequestSchema), async (c) => {
    try {
        const { name, url, description, collectionId } = c.req.valid('json')
        const bookmark = await createBookmark({ name, url, description, collectionId, userId: 1 })
        return c.json<CreateBookmarkResponse>(bookmark)
    } catch (err) {
        throw new HTTPException(400, { cause: err })
    }
})

bookmarkApp.put('/:id', zValidator('json', UpdateBookmarkRequestSchema), async (c) => {
    try {
        const id = Number(c.req.param('id'))
        const { name, url, description } = c.req.valid('json')
        const bookmark = await updateBookmark({ id, name, url, description })
        return c.json<UpdateBookmarkResponse>(bookmark)
    } catch (err) {
        throw new HTTPException(400, { cause: err })
    }
})

bookmarkApp.delete('/:id', zValidator('param', intIdParamSchema), async (c) => {
    try {
        const id = c.req.valid('param')
        await deleteBookmark(id)
        return c.json<DeleteBookmarkResponse>({})
    } catch (err) {
        throw new HTTPException(400, { cause: err })
    }
})

bookmarkApp.get('/collections', zValidator('query', GetCollectionsRequestSchema), async (c) => {
    try {
        const { pagination } = c.req.valid('query')
        const collections = await getCollections({ pagination, userId: 1 })
        return c.json<PaginatedResponse<GetCollectionsResponse>>(collections)
    } catch (err) {
        throw new HTTPException(400, { cause: err })
    }
})

bookmarkApp.post('/collections', zValidator('json', CreateCollectionRequestSchema), async (c) => {
    try {
        const { name, description } = c.req.valid('json')
        const collection = await createCollection({ name, description, userId: 1 })
        return c.json<CreateCollectionResponse>(collection)
    } catch (err) {
        throw new HTTPException(400, { cause: err })
    }
})

bookmarkApp.delete('/collections/:id', zValidator('param', intIdParamSchema), async (c) => {
    try {
        const id = c.req.valid('param')
        await deleteCollection(id)
        return c.json<DeleteCollectionResponse>({})
    } catch (err) {
        throw new HTTPException(400, { cause: err })
    }
})

export { bookmarkApp }
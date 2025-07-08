import { z } from 'zod'


// -------------------------------- get bookmarks --------------------------------

export const GetBookmarksRequestSchema = z.object({
  pagination: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }).optional(),
})

export type GetBookmarksRequest = z.infer<typeof GetBookmarksRequestSchema>


export type GetBookmarksResponse = {
    id: number
    name: string
    url: string
    description: string | null | undefined
}
  
// -------------------------------- create bookmark --------------------------------

export const CreateBookmarkRequestSchema = z.object({
  name: z.string(),
  url: z.string(),
  description: z.string().optional(),
  collectionId: z.number(),
})

export type CreateBookmarkRequest = z.infer<typeof CreateBookmarkRequestSchema>

export type CreateBookmarkResponse = {
    id: number
    name: string
    url: string
    description: string | null | undefined
}

// -------------------------------- update bookmark --------------------------------

export const UpdateBookmarkRequestSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  url: z.string().optional(),
  description: z.string().optional(),
})

export type UpdateBookmarkRequest = z.infer<typeof UpdateBookmarkRequestSchema>

export type UpdateBookmarkResponse = {
    id: number
    name: string
    url: string
    description: string | null | undefined
}

// -------------------------------- delete bookmark --------------------------------

export const DeleteBookmarkRequestSchema = z.number()

export type DeleteBookmarkRequest = z.infer<typeof DeleteBookmarkRequestSchema>

export type DeleteBookmarkResponse = {}

// -------------------------------- get collections --------------------------------

export const GetCollectionsRequestSchema = z.object({
  pagination: z.object({
    page: z.number().optional(),
    pageSize: z.number().optional(),
  }).optional(),
})

export type GetCollectionsRequest = z.infer<typeof GetCollectionsRequestSchema>

export type GetCollectionsResponse = {
    id: number
    name: string
    description: string | null | undefined
    userId: number
    createdAt: Date
    updatedAt: Date
}

// -------------------------------- create collection --------------------------------

export const CreateCollectionRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export type CreateCollectionRequest = z.infer<typeof CreateCollectionRequestSchema>

export type CreateCollectionResponse = {
    id: number
    name: string
    description: string | null | undefined
    userId: number
    createdAt: Date
    updatedAt: Date
}

// -------------------------------- delete collection --------------------------------

export const DeleteCollectionRequestSchema = z.number()

export type DeleteCollectionRequest = z.infer<typeof DeleteCollectionRequestSchema>

export type DeleteCollectionResponse = {}
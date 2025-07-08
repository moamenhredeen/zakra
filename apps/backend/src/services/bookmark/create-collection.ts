import { db } from '@infrastructure/database/data-source.js'
import { collections } from '@infrastructure/database/schema.js'

// -----------------------  types  -----------------------

export type CreateCollectionParams = {
    name: string
    description?: string
    userId: number
}

export type CreateCollectionResult = {
    id: number
    name: string
    description: string | null | undefined
    userId: number
    createdAt: Date
    updatedAt: Date
}

// -----------------------  public api  -----------------------

export async function createCollection(params: CreateCollectionParams): Promise<CreateCollectionResult> {
    const rows = await db
        .insert(collections)
        .values({
            name: params.name,
            description: params.description,
            user_id: params.userId,
        })
        .returning()

    if (rows.length === 0) {
        throw new Error('Collection not created')
    }
    
    const collection = rows[0]
    return {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        userId: collection.user_id,
        createdAt: collection.created_at,
        updatedAt: collection.updated_at,
    }
}
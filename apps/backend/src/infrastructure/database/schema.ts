import {
    boolean,
    integer,
    pgTable,
    primaryKey,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'

const timestamps = {
    created_at: timestamp().notNull().defaultNow(),
    updated_at: timestamp().notNull().defaultNow(),
    deleted_at: timestamp(),
}

export const users = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    username: varchar().notNull(),
    email: varchar().notNull().unique(),
    first_name: varchar().notNull(),
    last_name: varchar().notNull(),
    passowrd_hash: varchar().notNull(),
    verified: boolean().notNull().default(false),
    ...timestamps,
})

export const tags = pgTable('tags', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    description: varchar(),
    ...timestamps,
})

export const collections = pgTable('collections', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    description: varchar(),
    ...timestamps,
})

export const bookmarks = pgTable('bookmarks', {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    url: varchar().notNull(),
    description: varchar(),
    user_id: integer()
        .notNull()
        .references(() => users.id),
    collection_id: integer()
        .notNull()
        .references(() => collections.id),
    ...timestamps,
})

export const bookmarksToTags = pgTable(
    'bookmarks_to_tags',
    {
        tag_id: uuid()
            .notNull()
            .references(() => tags.id),
        bookmark_id: uuid()
            .notNull()
            .references(() => bookmarks.id),
    },
    (table) => [
        primaryKey({
            columns: [table.tag_id, table.bookmark_id],
        }),
    ]
)

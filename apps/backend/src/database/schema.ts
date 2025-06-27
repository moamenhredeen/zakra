
import {date, integer, pgTable, primaryKey, timestamp, varchar} from 'drizzle-orm/pg-core'

const timestamps = {
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
  deleted_at: timestamp(),
}

export const users = pgTable('users', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar().notNull(),
    email: varchar().notNull().unique(),
    first_name: varchar().notNull(),
    last_name: varchar().notNull(),
    passowrd_hash: varchar().notNull(),
    ...timestamps
})


export const tags = pgTable('tags', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    description: varchar(),
    ...timestamps
})



export const collections = pgTable('collections', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    description: varchar(),
    ...timestamps
})



export const bookmarks = pgTable('bookmarks', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    url: varchar().notNull(),
    description: varchar(),
    user_id: integer().notNull().references(() => users.id),
    collection_id: integer().notNull().references(() => collections.id),
    ...timestamps,
});


export const bookmarksToTags = pgTable('bookmarks_to_tags', {
    tag_id: integer().notNull().references(() => tags.id),
    bookmark_id: integer().notNull().references(() => bookmarks.id),
}, (table) => [
    primaryKey({
        columns: [table.tag_id, table.bookmark_id]
    })
])

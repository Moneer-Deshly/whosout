import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const topicsTable = sqliteTable('topics', {
    id: text('id').primaryKey().notNull(),
    topic: text('topic').notNull().unique()
});

export const itemsTable = sqliteTable('items', {
    id: text('id').notNull().primaryKey(),
    item: text('item').notNull().unique(),
    topicID: text('topic_id').notNull().references(() => topicsTable.id, {onDelete:"cascade"})
});
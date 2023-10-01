import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const shortener = sqliteTable('shortener', {
  id: integer("id", { mode: "number"}).primaryKey({ autoIncrement: true}),
  url: text('url').notNull(),
  urlId: text('urlId').notNull()
});
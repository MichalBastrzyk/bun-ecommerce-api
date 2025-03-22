import * as t from "drizzle-orm/sqlite-core"

export type CartItem = {
  productId: number
  quantity: number
}

export const carts = t.sqliteTable("carts", {
  id: t.text().primaryKey(),
  items: t
    .text({ mode: "json" })
    .$type<CartItem[]>()
    .$default(() => []),
})

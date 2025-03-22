import { randomUUIDv7 } from "bun"
import { Elysia, t } from "elysia"

import { eq } from "drizzle-orm"

import { db } from "@/drizzle/db"
import { carts } from "@/drizzle/schema"

export const cartRouter = new Elysia({
  prefix: "/cart",
})
  .guard({
    cookie: t.Optional(
      t.Object({
        cartId: t.Optional(t.String()),
      })
    ),
  })
  .get("", async ({ cookie }) => {
    const cartId = cookie.cartId.value

    if (!cartId) {
      const cartId = randomUUIDv7()

      await db.insert(carts).values({ id: cartId, items: [] })

      cookie.cartId.set({ value: cartId, domain: "localhost" })

      return []
    }

    if (cartId) {
      return db.query.carts.findFirst({
        where: (table, { eq }) => eq(table.id, cartId),
      })
    }
  })
  .post(
    "/add",
    async ({ cookie, body }) => {
      let cartId = cookie.cartId.value

      if (!cartId) {
        cartId = randomUUIDv7()

        await db.insert(carts).values({ id: cartId, items: [] })

        cookie.cartId.set({ value: cartId })
        console.log("cookie set")
      }

      console.log("cartId", cartId)

      const cart = await db.query.carts.findFirst({
        where: (table, { eq }) => eq(table.id, cartId),
      })

      if (!cart) {
        cookie.cartId.set({
          value: "",
          expires: new Date(0),
        })

        throw new Error("Cart not found")
      }

      const cartItem = cart.items?.find(
        (item) => item.productId === body.productId
      )

      if (cartItem) {
        cartItem.quantity += body.quantity
      } else {
        cart.items?.push(body)
      }

      const newState = await db
        .update(carts)
        .set({ items: cart.items })
        .where(eq(carts.id, cartId))
        .returning()

      return newState
    },
    {
      body: t.Object({
        productId: t.Number(),
        quantity: t.Number(),
      }),
    }
  )

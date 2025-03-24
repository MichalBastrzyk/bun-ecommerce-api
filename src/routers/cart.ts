import { randomUUIDv7 } from "bun"

import { Hono } from "hono"
import { getCookie, setCookie } from "hono/cookie"
import { zValidator } from "@hono/zod-validator"

import { eq } from "drizzle-orm"
import { z } from "zod"

import { db } from "@/drizzle/db"
import { carts } from "@/drizzle/schema"

export const cartRouter = new Hono()
  .get("/", async (c) => {
    const cartId = getCookie(c, "cartId")

    console.log("cartId", cartId)

    if (!cartId) {
      const cartId = randomUUIDv7()

      const cart = await db
        .insert(carts)
        .values({ id: cartId, items: [] })
        .returning()

      setCookie(c, "cartId", cartId)

      return c.json(cart)
    }

    const cart = await db.query.carts.findFirst({
      where: (table, { eq }) => eq(table.id, cartId),
    })

    if (!cart) {
      setCookie(c, "cartId", "", {
        expires: new Date(0),
      })

      throw new Error("Cart not found")
    }

    return c.json(cart)
  })
  .post(
    "/add",
    zValidator(
      "json",
      z.object({
        productId: z.number(),
        quantity: z.number(),
      })
    ),
    async (c) => {
      const body = c.req.valid("json")
      const cartId = getCookie(c, "cartId")

      if (!cartId) {
        const cartId = randomUUIDv7()

        const cart = await db
          .insert(carts)
          .values({ id: cartId, items: [body] })
          .returning()

        setCookie(c, "cartId", cartId)

        return c.json(cart)
      }

      console.log("cartId", cartId)

      const cart = await db.query.carts.findFirst({
        where: (table, { eq }) => eq(table.id, cartId),
      })

      if (!cart) {
        setCookie(c, "cartId", "", {
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

      return c.json(newState)
    }
  )

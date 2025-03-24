import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"

import { cartRouter } from "./routers/cart"

const app = new Hono()
  .use(cors({ origin: "http://localhost:3000", credentials: true }))
  .use(logger())
  .route("cart", cartRouter)

export default {
  fetch: app.fetch,
  port: 4000,
}

export type AppType = typeof app

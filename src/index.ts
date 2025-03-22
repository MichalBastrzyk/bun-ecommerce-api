import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { swagger } from "@elysiajs/swagger"

import { cartRouter } from "@/routers/cart"

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(cartRouter)
  .get("/", () => "Hello Elysia")
  .listen(4000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app

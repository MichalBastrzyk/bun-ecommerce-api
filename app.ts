import { hc } from "hono/client"

import type { AppType } from "./src"

const client = hc<AppType>("http://localhost:4000", {
  init: {
    credentials: "include",
  },
})

const res = await client.cart.add.$post({
  json: {
    productId: 1,
    quantity: 2,
  },
})

const json = await res.json()

console.log("result", json)

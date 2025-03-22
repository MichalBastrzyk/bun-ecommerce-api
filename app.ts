import { edenFetch } from "@elysiajs/eden"

import type { App } from "@/index"

const $fetch = edenFetch<App>("http://localhost:4000")

const result = await $fetch("/cart", { method: "GET" })

console.log("result", result)

const addingResult = await $fetch("/cart/add", {
  method: "POST",
  body: {
    productId: 123,
    quantity: 1,
  },
})

console.log("addingResult", addingResult)

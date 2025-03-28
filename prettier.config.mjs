/** @type {import('prettier').Config} */
const config = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],

  importOrder: [
    "^(bun/(.*)$)|^(bun$)",
    "",
    "^(hono/(.*)$)|^(hono$)",
    "^(@hono/(.*)$)|^(@hono$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "",
    "^@/drizzle/(.*)$",
    "^@/server/(.*)$",
    "^@/data/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^@/features/(.*)$",
    "",
    "^[./]",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
}

export default config

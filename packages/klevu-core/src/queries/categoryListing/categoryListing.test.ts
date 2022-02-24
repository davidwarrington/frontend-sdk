import { KlevuConfig, KlevuFetch, search } from "../.."
import { categoryListing } from "./categoryListing"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs15v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-156925593843210765",
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(categoryListing("Women"))

  expect(result.queriesById("categoryListing")).toBeDefined()
  expect(result.queriesById("categoryListing")?.records.length).toBeGreaterThan(
    0
  )
})

import { KlevuConfig, KlevuFetch, search, suggestions } from "../.."

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

test("Suggestion test", async () => {
  const result = await KlevuFetch(search("hoo"), suggestions("hoo"))

  expect(result.queriesById("search")).toBeDefined()
  expect(result.suggestionsById("suggestions")?.suggestions).toBeDefined()
  expect(
    result.suggestionsById("suggestions")?.suggestions.length
  ).toBeGreaterThan(0)
})

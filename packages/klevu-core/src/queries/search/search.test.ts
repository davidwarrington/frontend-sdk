import { KlevuConfig, KlevuFetch, search } from "../../index.js"
import { listFilters } from "../../modifiers/index.js"

beforeEach(() => {
  KlevuConfig.init({
    url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
    apiKey: "klevu-160320037354512854",
  })
})

test("Basic search", async () => {
  const result = await KlevuFetch(
    search("hoodies", {
      id: "test",
    })
  )

  expect(result.queriesById("test")).toBeDefined()
  expect(result.queriesById("test")?.records.length).toBeGreaterThan(0)
})

test("Pagination test", async () => {
  const result = await KlevuFetch(
    search(
      "*",
      {
        limit: 2,
      },
      listFilters()
    )
  )

  const searchResult = result.queriesById("search")

  expect(searchResult?.records.length).toBe(2)
  expect(searchResult?.next).toBeDefined()
  expect(searchResult?.filters?.length).toBeGreaterThan(0)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextResult = await searchResult?.next!()
  const nextSearchResult = nextResult?.queriesById("search")

  const prevFirstId = searchResult?.records[0].id
  const nextFirstId = nextSearchResult?.records[0].id
  expect(nextFirstId).not.toBe(prevFirstId)
  expect(nextSearchResult?.next).toBeDefined()
  expect(nextSearchResult?.filters?.length).toBeGreaterThan(0)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const nextNextResult = await nextSearchResult?.next!()
  const nextNextSearchResult = nextNextResult?.queriesById("search")
  const nextNextFirstId = nextNextSearchResult?.records[0].id
  expect(nextNextFirstId).not.toBe(prevFirstId)
  expect(nextNextFirstId).not.toBe(nextFirstId)
  expect(nextNextSearchResult?.filters?.length).toBeGreaterThan(0)
})

test("Limit test", async () => {
  const result = await KlevuFetch(
    search("*", {
      limit: 14,
    })
  )

  expect(result.queriesById("search")?.records.length).toBe(14)
})

test("No type errors", async () => {
  const result = await KlevuFetch(
    search("*", {
      limit: 14,
      typeOfRecords: ["test"],
    })
  )

  expect(result.queriesById("test")).toBe(undefined)
})

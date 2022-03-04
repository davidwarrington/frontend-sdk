import { KlevuFetchModifer } from ".."

/**
 * Force include product ids on result
 *
 * @category Modifiers
 * @param options
 * @returns
 */
export function include(ids: string[]): KlevuFetchModifer {
  const keyValueIdArray = ids.map((id) => ({
    key: "id",
    value: id,
  }))

  return {
    klevuModifierId: "include",
    modifyAfter: (queries) => {
      const copy = Array.from(queries)
      for (const q of copy) {
        if (!q.settings) {
          q.settings = {}
        }
        if (!q.settings.includeIds) {
          q.settings.includeIds = keyValueIdArray
        } else {
          q.settings.includeIds.push(...keyValueIdArray)
        }
      }
      return copy
    },
  }
}
import { KlevuFetchFunction } from ".."
import {
  isKlevuSearchQuery,
  KlevuApplyFilter,
  KlevuListFilter,
} from "../../connection/queryModels"

type Options = {
  /**
   * Which queries should have these filters applied. By defaut this is ["search"]
   */
  targetIds: string[]
}

const defaults: Options = {
  targetIds: ["search"],
}

type Filter = {
  key: string
  values: string[] | [number, number]
  settings: {
    singleSelect: boolean
  }
}

/**
 *
 * @category Queries
 * @param term Search term from input
 * @param id id of request. Response is under this is. Has to be unique across single query. Default is 'search'
 * @param options
 * @returns
 */
export function applyFilters(
  filters: Filter[],
  options?: Partial<Options>
): KlevuFetchFunction {
  const params: Options = {
    ...defaults,
    ...options,
  }

  const query: KlevuApplyFilter = {
    applyFilters: {
      filters,
    },
  }

  return {
    klevuFunctionId: "applyFilters",
    modifyAfter: (queries) => {
      for (const q of queries) {
        if (!isKlevuSearchQuery(q)) {
          continue
        }
        if (params.targetIds.includes(q.id)) {
          const filters: KlevuListFilter & KlevuApplyFilter = {
            ...q.filters,
            applyFilters: query.applyFilters,
          }
          q.filters = filters
        }
      }
      return queries
    },
  }
}
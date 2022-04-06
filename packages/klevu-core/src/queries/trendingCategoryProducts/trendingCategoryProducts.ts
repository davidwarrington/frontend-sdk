import { KlevuTrendingProductsQuery } from "../../models/KlevuTrendingProductsQuery.js"
import { KlevuFetchFunctionReturnValue } from "../index.js"
import { KlevuFetchModifer } from "../../modifiers/index.js"
import { lastClickedProducts } from "../../store/lastClickedProducts.js"
import {
  KlevuAnyTypeOfRecord,
  KlevuTypeOfRecord,
  KlevuTypeOfRequest,
} from "../../models/index.js"

type Options = {
  id: string
  /**
   * Tell algorithm which type or records we have last visited
   */
  recentType?: KlevuAnyTypeOfRecord
  /**
   * The id's of those records
   */
  recent?: string[]
  /**
   * Use automatic last clicked products
   */
  useLastVisitedProducts?: boolean
}

const defaultOptions: Options = {
  id: "trending",
}

/**
 * Return trending recommendations
 *
 * @category RecommendationQuery
 * @param options
 * @param modifiers
 * @returns
 */
export function trendingCategoryProducts(
  categoryPath: string,
  options?: Options,
  ...modifiers: KlevuFetchModifer[]
): KlevuFetchFunctionReturnValue {
  const params: Options = {
    ...defaultOptions,
    ...options,
  }

  const query: KlevuTrendingProductsQuery = {
    id: "trendingCategoryProducts",
    typeOfRequest: KlevuTypeOfRequest.Trending,
    settings: {
      context: params.useLastVisitedProducts
        ? {
            recentObjects: [
              {
                typeOfRecord: KlevuTypeOfRecord.Product,
                records: lastClickedProducts
                  .getLastClickedLatestsFirst()
                  .map((id) => ({ id })),
              },
            ],
          }
        : params?.recent && params?.recentType
        ? {
            recentObjects: [
              {
                typeOfRecord: params.recentType,
                records: params.recent.map((id) => ({ id })),
              },
            ],
          }
        : undefined,
      query: {
        term: "*",
        categoryPath: categoryPath,
      },
    },
  }

  return {
    klevuFunctionId: "recommendation",
    queries: [query],
    modifiers,
  }
}

import { KlevuDomEvents } from "../events/customEvents"

export type KlevuLastSearch = {
  timestamp: number
  term: string
}
const SAVE_KEY = "klevu-last-searches"
let lastSearches: KlevuLastSearch[] = []
if (window) {
  const res = window.localStorage.getItem(SAVE_KEY)
  if (res) {
    lastSearches = JSON.parse(res)
  }
}

export const KlevuLastSearches = {
  save: (term: string) => {
    lastSearches.push({
      timestamp: new Date().getTime(),
      term: term,
    })

    if (window && document) {
      document.dispatchEvent(new CustomEvent(KlevuDomEvents.LastSearchUpdate))
      window.localStorage.setItem(SAVE_KEY, JSON.stringify(lastSearches))
    }
  },

  get: () => {
    return lastSearches.slice(-5)
  },
}
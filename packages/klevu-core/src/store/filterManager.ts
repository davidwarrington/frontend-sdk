import {
  FilterResultOptions,
  FilterResultSlider,
  isFilterResultOptions,
  isFilterResultSlider,
} from "../connection/queryModels"
import { KlevuDomEvents } from "../events/customEvents"

export class FilterManager {
  options: FilterResultOptions[] = []
  sliders: FilterResultSlider[] = []

  initFromListFilters(
    filters: Array<FilterResultOptions | FilterResultSlider>
  ) {
    this.options = []
    this.sliders = []
    for (const f of filters) {
      if (isFilterResultOptions(f)) {
        this.options.push(f)
      } else if (isFilterResultSlider(f)) {
        this.sliders.push(f)
      }
    }
    this.sort()
  }

  private sort() {
    for (const o of this.options) {
      o.options.sort((a, b) => b.count - a.count)
    }
  }

  /**
   * Function to select filters in filter manager
   *
   * Sends a Dom event on change
   *
   * @param key Key of option
   * @param name Name of value
   */
  toggleOption(key: string, name: string) {
    const optionIndex = this.options.findIndex((o) => o.key === key)

    if (optionIndex === -1) {
      console.warn(`No filter found with ${key}.`)
      return
    }

    const subOptionIndex = this.options[optionIndex].options.findIndex(
      (o) => o.name === name
    )

    if (subOptionIndex === -1) {
      console.warn(`No filter ${key} option found with ${name}.`)
      return
    }

    const prevSeleted =
      this.options[optionIndex].options[subOptionIndex].selected

    this.options[optionIndex].options[subOptionIndex].selected = !prevSeleted

    document.dispatchEvent(
      new CustomEvent(KlevuDomEvents.FilterSelectionUpdate, {
        detail: {
          key,
          name,
          selected: !prevSeleted,
        },
      })
    )
  }
}
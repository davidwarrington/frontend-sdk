<template>
  <section v-if="quickSearchStore.trendingProducts.length" class="body-font">
    <h3>Trending Products</h3>
    <div class="container px-5 pt-5 pb-24 mx-auto">
      <div class="flex flex-wrap -m-4 items-start treding-products-results">
        <Product
          v-for="(product, index) in quickSearchStore.trendingProducts"
          :key="index"
          :product="product"
          @clickHandler="productClick"
          classes="p-4 w-1/2 lg:w-1/3"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import useQuickSearch from "../stores/quickSearchStore"
import { KlevuEvents } from "@klevu/core"
const quickSearchStore = useQuickSearch()

const productClick = (product) => {
  KlevuEvents.searchProductClick(product, quickSearchStore.searchTerm)
}
</script>

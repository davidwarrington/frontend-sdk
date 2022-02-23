import React from "react"
import ReactDOM from "react-dom"
import { KlevuConfig } from "@klevu/core"
import { App } from "./app"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { HomePage } from "./routes/HomePage"
import { ProductsPage } from "./routes/ProductsPage"
import { ProductPage } from "./routes/ProductPage"
import { CategoryPage } from "./routes/CategoryPage"

KlevuConfig.init({
  url: "https://eucs23v2.ksearchnet.com/cs/v2/search",
  apiKey: "klevu-160320037354512854",
})

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />}>
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="category" element={<CategoryPage />}>
          <Route path=":id" element={<CategoryPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("reactroot")
)
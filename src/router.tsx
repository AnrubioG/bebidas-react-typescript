import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IndexPage } from "./views/IndexPage";
import { Layout } from "./layouts/Layout";
import { FavoritePage } from "./views/FavoritePage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route element={<Layout />}>
            <Route path="/" element={<IndexPage />} index />
            <Route path="/favoritos" element={<FavoritePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

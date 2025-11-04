import "./globals.css";

import ProductsPage from "./components/products/ProductsPage";

export const metadata = {
  title: "Curly Gurl",
  description: "Explore our products",
};

export default function Home() {
  return (
    <div>
      <ProductsPage />
    </div>
  );
}

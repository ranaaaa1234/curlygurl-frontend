import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductsPage from "./components/ProductsPage";


export default function Home() {
  return (
    <div>
      <Header />
      <ProductsPage />
      <Footer />
    </div>
  );
}

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Searchbar from "./components/Searchbar";

export default function Home() {
  return (
    <div>
      <Header />
      <Searchbar />
      <Products />
      <Footer />
    </div>
  );
}

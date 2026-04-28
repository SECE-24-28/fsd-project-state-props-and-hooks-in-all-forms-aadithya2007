import ProductCard from "./cards/ProductCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api";
import "../CSS/ShopPage.css";

function ShopPage() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const data = await apiRequest(
        categoryId ? `/products?category=${categoryId}` : "/products"
      );
      setProducts(data);
      setCategoryName(data[0]?.category?.name || "");
    }

    loadProducts().catch(() => {
      setProducts([]);
      setCategoryName("");
    });
  }, [categoryId]);

  return (
    <main className="page shop-page">
      <section className="page-hero centered">
        <h1>{categoryName || "Fresh Products"}</h1>
        <p>Choose from our wide range of farm-fresh groceries.</p>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
        {products.length === 0 && <p>No products found.</p>}
      </section>
    </main>
  );
}

export default ShopPage;

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CategoryCard from "./cards/CategoryCard";
import ProductCard from "./cards/ProductCard";
import { apiRequest } from "../api";
import heroImage from "../Images/vegetables.png";
import "../CSS/HomePage.css";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadHomeData() {
      const [categoryData, productData] = await Promise.all([
        apiRequest("/categories"),
        apiRequest("/products"),
      ]);
      setCategories(categoryData);
      setProducts(productData);
    }

    loadHomeData().catch(() => {
      setCategories([]);
      setProducts([]);
    });
  }, []);

  return (
    <main className="page home-page">
      <section className="hero">
        <div className="hero-text">
          <p className="eyebrow">100% Organic and Fresh</p>
          <h1>
            Fresh Groceries
            <br />
            Delivered to Your Doorstep
          </h1>
          <p>
            Handpicked farm fresh products delivered fast and safe to your
            home.
          </p>
          <div className="button-row">
            <Link className="primary-btn" to="/shop">
              Shop Now
            </Link>
            <Link className="secondary-btn" to="/categories">
              Explore Categories
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Fresh groceries" />
        </div>
      </section>

      <section className="section">
        <h2>Shop by Categories</h2>
        <div className="category-container">
          {categories.slice(0, 7).map((category) => (
            <CategoryCard key={category.name} category={category} compact />
          ))}
          {categories.length === 0 && <p>No categories added yet.</p>}
        </div>
      </section>

      <section className="section">
        <h2>Popular Products</h2>
        <div className="product-container">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.name} product={product} simple />
          ))}
          {products.length === 0 && <p>No products added yet.</p>}
        </div>
      </section>

      <section className="offer-strip">
        <h2>Get up to 50% off on your first order</h2>
        <Link className="light-btn" to="/offers">
          Shop Now
        </Link>
      </section>
    </main>
  );
}

export default HomePage;

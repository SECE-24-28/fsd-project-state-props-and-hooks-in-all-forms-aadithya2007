import { useEffect, useState } from "react";
import CategoryCard from "./cards/CategoryCard";
import { apiRequest } from "../api";
import "../CSS/CategoriesPage.css";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiRequest("/categories")
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  return (
    <main className="page categories-page">
      <section className="page-hero centered">
        <h1>Shop by Categories</h1>
        <p>
          Explore fresh groceries and daily essentials carefully selected for
          your family.
        </p>
      </section>

      <section className="categories-grid">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
        {categories.length === 0 && <p>No categories added yet.</p>}
      </section>
    </main>
  );
}

export default CategoriesPage;

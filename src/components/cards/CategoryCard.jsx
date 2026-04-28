import { Link } from "react-router-dom";
import "../../CSS/Cards.css";

function CategoryCard({ category, compact = false }) {
  return (
    <Link
      className={compact ? "category-card compact" : "category-card"}
      to={`/shop/category/${category.id}`}
    >
      <img src={category.image} alt={category.name} />
      <h3>{category.name}</h3>
    </Link>
  );
}

export default CategoryCard;

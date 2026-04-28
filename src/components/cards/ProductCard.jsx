import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatProductPrice } from "../../api";
import "../../CSS/Cards.css";

function ProductCard({ product, simple = false }) {
  const [quantity, setQuantity] = useState(1);

  const {
    addToCart,
    updateQuantity,
    removeFromCart,
    cart,
  } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    setQuantity(1);
  };

  const handleIncrease = () => {
    if (cartItem) {
      updateQuantity(product.id, cartItem.quantity + 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(product.id, cartItem.quantity - 1);
      } else {
        removeFromCart(product.id);
      }
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const displayQuantity = cartItem
    ? cartItem.quantity
    : quantity;

  return (
    <article className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      {!simple && (
        <>
          <h3>{product.name}</h3>

          <p className="price">
            {formatProductPrice(product)}
          </p>

          <div className="product-actions">

            <div className="quantity-selector">

              <button
                type="button"
                className="qty-btn"
                onClick={handleDecrease}
              >
                −
              </button>

              <span className="qty-display">
                {displayQuantity}
              </span>

              <button
                type="button"
                className="qty-btn"
                onClick={handleIncrease}
              >
                +
              </button>

            </div>

            {!cartItem ? (
              <button
                type="button"
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            ) : (
              <button
                type="button"
                className="remove-cart-btn"
                onClick={() =>
                  removeFromCart(product.id)
                }
              >
                Remove From Cart
              </button>
            )}

          </div>
        </>
      )}

    </article>
  );
}

export default ProductCard;

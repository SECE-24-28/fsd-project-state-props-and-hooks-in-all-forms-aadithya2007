import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { formatProductPrice } from "../api";
import "../CSS/CartPage.css";

function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCart();

  if (cart.length === 0) {
    return (
      <main className="page cart-page">
        <section className="page-hero centered">
          <h1>Shopping Cart</h1>
        </section>
        <section className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Continue shopping and add items to your cart.</p>
          <Link to="/shop" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <section className="page-hero centered">
        <h1>Shopping Cart</h1>
      </section>

      <section className="cart-container">
        <div className="cart-items">
          <h2>Cart Items ({cart.length})</h2>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const price = Number(item.price || 0);
                const total = price * item.quantity;
                return (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td>{formatProductPrice(item)}</td>
                    <td>
                      <div className="quantity-controls">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>Rs. {total.toFixed(2)}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span>Subtotal:</span>
            <span>Rs. {getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping:</span>
            <span>Rs. 50</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>Rs. {(getTotalPrice() + 50).toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
          <button className="continue-shopping-link">
            <Link to="/shop">Continue Shopping</Link>
          </button>
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </section>
    </main>
  );
}

export default CartPage;

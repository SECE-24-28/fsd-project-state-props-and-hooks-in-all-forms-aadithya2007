import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import {
  FaUserCircle,
  FaShoppingCart,
  FaUserCog,
  FaUserPlus,
} from "react-icons/fa";

import { MdLogin } from "react-icons/md";

import "../../CSS/Navbar.css";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "Offers", to: "/offers" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const { cart } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <header className="site-header">

      <NavLink className="logo" to="/">
        VegiMart
      </NavLink>

      <nav className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">

        <input
          type="search"
          placeholder="Search Products..."
        />

        <div className="user-menu">

          <button
            className="user-icon"
            onClick={() =>
              setIsDropdownOpen(!isDropdownOpen)
            }
          >
            <FaUserCircle />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">

              <NavLink
                to="/cart"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                <span>
                  <FaShoppingCart /> Cart
                </span>

                {cart.length > 0 && (
                  <span className="cart-badge">
                    {cart.length}
                  </span>
                )}
              </NavLink>

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="dropdown-item"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <span>
                    <FaUserCog /> Admin Panel
                  </span>
                </NavLink>
              )}

              <hr className="dropdown-divider" />

              {user ? (
                <button className="dropdown-item" type="button" onClick={handleLogout}>
                  <span>
                    <MdLogin /> Logout
                  </span>
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span>
                      <MdLogin /> Login
                    </span>
                  </NavLink>

                  <NavLink
                    to="/register"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span>
                      <FaUserPlus /> Register
                    </span>
                  </NavLink>
                </>
              )}

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;

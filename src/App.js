import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import AboutUs from "./components/AboutUS";
import CategoriesPage from "./components/CategoriesPage";
import ContactPage from "./components/ContactPage";
import FaqPage from "./components/FaqPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import OffersPage from "./components/OffersPage";
import RegisterPage from "./components/RegisterPage";
import ShopPage from "./components/ShopPage";
import CartPage from "./components/CartPage";
import AdminPanel from "./components/AdminPanel";
import TermsConditionsPage from "./components/TermsConditionsPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";

import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AdminRoute({ children }) {
  const { isAdmin } = useAuth();

  return isAdmin ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />

              <Route path="/shop" element={<ShopPage />} />
              <Route
                path="/shop/category/:categoryId"
                element={<ShopPage />}
              />

              <Route path="/cart" element={<CartPage />} />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminPanel />
                  </AdminRoute>
                }
              />

              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/forgot-password"
                element={<ForgotPasswordPage />}
              />

              {/* Legal Pages */}
              <Route
                path="/terms"
                element={<TermsConditionsPage />}
              />

              <Route
                path="/privacy-policy"
                element={<PrivacyPolicyPage />}
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
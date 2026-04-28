import { useEffect, useState } from "react";
import { apiRequest, formatProductPrice } from "../api";
import "../CSS/AdminPanel.css";

const emptyProduct = {
  name: "",
  price: "",
  unit: "",
  image: "",
  category: "",
  inStock: true,
};

const emptyCategory = {
  name: "",
  image: "",
};

const emptyUser = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [productForm, setProductForm] = useState(emptyProduct);
  const [categoryForm, setCategoryForm] = useState(emptyCategory);
  const [userForm, setUserForm] = useState(emptyUser);
  const [editing, setEditing] = useState({ type: "", id: "" });
  const [message, setMessage] = useState("");

  const loadAdminData = async () => {
    const [productData, categoryData, userData] = await Promise.all([
      apiRequest("/products"),
      apiRequest("/categories"),
      apiRequest("/users"),
    ]);
    setProducts(productData);
    setCategories(categoryData);
    setUsers(userData);
  };

  useEffect(() => {
    loadAdminData().catch((error) => setMessage(error.message));
  }, []);

  const resetForms = () => {
    setProductForm(emptyProduct);
    setCategoryForm(emptyCategory);
    setUserForm(emptyUser);
    setEditing({ type: "", id: "" });
  };

  const runAdminAction = async (action) => {
    try {
      await action();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleProductSubmit = async (event) => {
    event.preventDefault();
    await runAdminAction(async () => {
      const payload = {
        ...productForm,
        price: Number(productForm.price),
      };
      const path = editing.type === "product" ? `/products/${editing.id}` : "/products";
      const method = editing.type === "product" ? "PUT" : "POST";

      await apiRequest(path, { method, body: JSON.stringify(payload) });
      await loadAdminData();
      resetForms();
      setMessage("Product saved.");
    });
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    await runAdminAction(async () => {
      const path =
        editing.type === "category" ? `/categories/${editing.id}` : "/categories";
      const method = editing.type === "category" ? "PUT" : "POST";

      await apiRequest(path, { method, body: JSON.stringify(categoryForm) });
      await loadAdminData();
      resetForms();
      setMessage("Category saved.");
    });
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    await runAdminAction(async () => {
      const payload = { ...userForm };

      if (editing.type === "user" && !payload.password) {
        delete payload.password;
      }

      const path = editing.type === "user" ? `/users/${editing.id}` : "/users";
      const method = editing.type === "user" ? "PUT" : "POST";

      await apiRequest(path, { method, body: JSON.stringify(payload) });
      await loadAdminData();
      resetForms();
      setMessage("User saved.");
    });
  };

  const deleteRecord = async (type, id) => {
    await runAdminAction(async () => {
      const paths = {
        product: `/products/${id}`,
        category: `/categories/${id}`,
        user: `/users/${id}`,
      };

      await apiRequest(paths[type], { method: "DELETE" });
      await loadAdminData();
      resetForms();
      setMessage(`${type} deleted.`);
    });
  };

  const editProduct = (product) => {
    setActiveTab("products");
    setProductForm({
      name: product.name,
      price: product.price,
      unit: product.unit || "",
      image: product.image,
      category: product.category?.id || product.category,
      inStock: product.inStock,
    });
    setEditing({ type: "product", id: product.id });
  };

  const editCategory = (category) => {
    setActiveTab("categories");
    setCategoryForm({ name: category.name, image: category.image });
    setEditing({ type: "category", id: category.id });
  };

  const editUser = (user) => {
    setActiveTab("users");
    setUserForm({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setEditing({ type: "user", id: user.id });
  };

  return (
    <main className="page admin-panel">
      <section className="page-hero centered">
        <h1>Admin Panel</h1>
        <p>Manage products, categories, and users.</p>
      </section>

      <section className="admin-container">
        {message && <p className="admin-message">{message}</p>}

        <div className="admin-tabs">
          {["products", "categories", "users"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                resetForms();
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "products" && (
          <>
            <form className="product-form" onSubmit={handleProductSubmit}>
              <h3>{editing.type === "product" ? "Edit Product" : "Add Product"}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="product-name">Name</label>
                  <input
                    id="product-name"
                    value={productForm.name}
                    onChange={(event) =>
                      setProductForm({ ...productForm, name: event.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="product-price">Price</label>
                  <input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={productForm.price}
                    onChange={(event) =>
                      setProductForm({ ...productForm, price: event.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="product-unit">Unit</label>
                  <input
                    id="product-unit"
                    value={productForm.unit}
                    placeholder="kg, litre, dozen"
                    onChange={(event) =>
                      setProductForm({ ...productForm, unit: event.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="product-category">Category</label>
                  <select
                    id="product-category"
                    value={productForm.category}
                    onChange={(event) =>
                      setProductForm({ ...productForm, category: event.target.value })
                    }
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="product-image">Image URL</label>
                  <input
                    id="product-image"
                    value={productForm.image}
                    onChange={(event) =>
                      setProductForm({ ...productForm, image: event.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Save Product
                </button>
                <button type="button" className="cancel-btn" onClick={resetForms}>
                  Cancel
                </button>
              </div>
            </form>

            <DataTable
              headers={["Product", "Category", "Price", "Image", "Actions"]}
              rows={products.map((product) => [
                product.name,
                product.category?.name || "Uncategorized",
                formatProductPrice(product),
                <img src={product.image} alt={product.name} className="table-product-image" />,
                <RowActions
                  onEdit={() => editProduct(product)}
                  onDelete={() => deleteRecord("product", product.id)}
                />,
              ])}
            />
          </>
        )}

        {activeTab === "categories" && (
          <>
            <form className="product-form" onSubmit={handleCategorySubmit}>
              <h3>{editing.type === "category" ? "Edit Category" : "Add Category"}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="category-name">Name</label>
                  <input
                    id="category-name"
                    value={categoryForm.name}
                    onChange={(event) =>
                      setCategoryForm({ ...categoryForm, name: event.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category-image">Image URL</label>
                  <input
                    id="category-image"
                    value={categoryForm.image}
                    onChange={(event) =>
                      setCategoryForm({ ...categoryForm, image: event.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Save Category
                </button>
                <button type="button" className="cancel-btn" onClick={resetForms}>
                  Cancel
                </button>
              </div>
            </form>

            <DataTable
              headers={["Category", "Image", "Actions"]}
              rows={categories.map((category) => [
                category.name,
                <img src={category.image} alt={category.name} className="table-product-image" />,
                <RowActions
                  onEdit={() => editCategory(category)}
                  onDelete={() => deleteRecord("category", category.id)}
                />,
              ])}
            />
          </>
        )}

        {activeTab === "users" && (
          <>
            <form className="product-form" onSubmit={handleUserSubmit}>
              <h3>{editing.type === "user" ? "Edit User" : "Add User"}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="user-name">Name</label>
                  <input
                    id="user-name"
                    value={userForm.name}
                    onChange={(event) => setUserForm({ ...userForm, name: event.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-email">Email</label>
                  <input
                    id="user-email"
                    type="email"
                    value={userForm.email}
                    onChange={(event) => setUserForm({ ...userForm, email: event.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-password">Password</label>
                  <input
                    id="user-password"
                    type="password"
                    value={userForm.password}
                    placeholder={editing.type === "user" ? "Leave blank to keep" : ""}
                    onChange={(event) =>
                      setUserForm({ ...userForm, password: event.target.value })
                    }
                    required={editing.type !== "user"}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-role">Role</label>
                  <select
                    id="user-role"
                    value={userForm.role}
                    onChange={(event) => setUserForm({ ...userForm, role: event.target.value })}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  Save User
                </button>
                <button type="button" className="cancel-btn" onClick={resetForms}>
                  Cancel
                </button>
              </div>
            </form>

            <DataTable
              headers={["Name", "Email", "Role", "Actions"]}
              rows={users.map((user) => [
                user.name,
                user.email,
                user.role,
                <RowActions
                  onEdit={() => editUser(user)}
                  onDelete={() => deleteRecord("user", user.id)}
                />,
              ])}
            />
          </>
        )}
      </section>
    </main>
  );
}

function DataTable({ headers, rows }) {
  return (
    <div className="products-table">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="empty-table">No records found.</p>}
    </div>
  );
}

function RowActions({ onEdit, onDelete }) {
  return (
    <>
      <button type="button" className="edit-btn" onClick={onEdit}>
        Edit
      </button>
      <button type="button" className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </>
  );
}

export default AdminPanel;

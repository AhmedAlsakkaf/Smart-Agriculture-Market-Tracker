import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editingProduct, setEditingProduct] = useState(null);

  // Mock data - Will be replaced with API call
  useEffect(() => {
    // TODO: Replace with actual API call
    const mockProducts = [
      {
        id: 1,
        name: "Tomato",
        category: "vegetable",
        price: 45,
        unit: "kg",
        region: "Karachi",
        stock: "in-stock",
      },
      {
        id: 2,
        name: "Potato",
        category: "vegetable",
        price: 35,
        unit: "kg",
        region: "Lahore",
        stock: "in-stock",
      },
      {
        id: 3,
        name: "Onion",
        category: "vegetable",
        price: 50,
        unit: "kg",
        region: "Islamabad",
        stock: "limited",
      },
      {
        id: 4,
        name: "Mango",
        category: "fruit",
        price: 120,
        unit: "kg",
        region: "Multan",
        stock: "in-stock",
      },
      {
        id: 5,
        name: "Apple",
        category: "fruit",
        price: 200,
        unit: "kg",
        region: "Quetta",
        stock: "in-stock",
      },
      {
        id: 6,
        name: "Carrot",
        category: "vegetable",
        price: 40,
        unit: "kg",
        region: "Faisalabad",
        stock: "in-stock",
      },
    ];
    setProducts(mockProducts);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // TODO: API call to delete product
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // TODO: API call to update product
    setProducts(
      products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
    alert("Product updated successfully!");
  };

  const handleEditChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockBadgeColor = (stock) => {
    switch (stock) {
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "limited":
        return "bg-yellow-100 text-yellow-800";
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-light-green py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center text-primary-green hover:text-opacity-80 mb-4"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </button>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold text-primary-green">
                  All Products
                </h1>
                <p className="text-gray-600 mt-2">
                  View, edit, or delete products
                </p>
              </div>
              <button
                onClick={() => navigate("/admin/add-product")}
                className="bg-primary-green text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add New Product
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                >
                  <option value="all">All Categories</option>
                  <option value="vegetable">Vegetables</option>
                  <option value="fruit">Fruits</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-green text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-500"
                      >
                        No products found
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-light-green transition"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600 capitalize">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          Rs. {product.price}/{product.unit}
                        </td>
                        <td className="px-6 py-4 text-gray-600 capitalize">
                          {product.region}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockBadgeColor(
                              product.stock
                            )}`}
                          >
                            {product.stock.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-primary-green hover:text-opacity-80 p-2"
                              title="Edit"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-800 p-2"
                              title="Delete"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-primary-green mb-4">
                  Edit Product
                </h2>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editingProduct.name}
                      onChange={handleEditChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (Rs.)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={editingProduct.price}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Status
                      </label>
                      <select
                        name="stock"
                        value={editingProduct.stock}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
                        required
                      >
                        <option value="in-stock">In Stock</option>
                        <option value="limited">Limited Stock</option>
                        <option value="out-of-stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary-green text-white py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                      Update Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;

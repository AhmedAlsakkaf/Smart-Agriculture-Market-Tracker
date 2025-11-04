import { authenticatedFetch } from "./authService";

// API Base URL - Update this when you get the backend URL
const API_BASE_URL = "http://localhost:5000/api"; // TODO: Update with actual backend URL

// Product/Market Data Service
export const productService = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await authenticatedFetch("/products", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      return data;
    } catch (error) {
      console.error("Get Products Error:", error);
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await authenticatedFetch(`/products/${id}`, {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch product");
      }

      return data;
    } catch (error) {
      console.error("Get Product Error:", error);
      throw error;
    }
  },

  // Add new product (Admin only)
  addProduct: async (productData) => {
    try {
      const response = await authenticatedFetch("/products", {
        method: "POST",
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      return data;
    } catch (error) {
      console.error("Add Product Error:", error);
      throw error;
    }
  },

  // Update product (Admin only)
  updateProduct: async (id, productData) => {
    try {
      const response = await authenticatedFetch(`/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      return data;
    } catch (error) {
      console.error("Update Product Error:", error);
      throw error;
    }
  },

  // Delete product (Admin only)
  deleteProduct: async (id) => {
    try {
      const response = await authenticatedFetch(`/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      return data;
    } catch (error) {
      console.error("Delete Product Error:", error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (searchTerm) => {
    try {
      const response = await authenticatedFetch(
        `/products/search?q=${searchTerm}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to search products");
      }

      return data;
    } catch (error) {
      console.error("Search Products Error:", error);
      throw error;
    }
  },

  // Filter products by category
  filterByCategory: async (category) => {
    try {
      const response = await authenticatedFetch(
        `/products/category/${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to filter products");
      }

      return data;
    } catch (error) {
      console.error("Filter Products Error:", error);
      throw error;
    }
  },

  // Filter products by region
  filterByRegion: async (region) => {
    try {
      const response = await authenticatedFetch(`/products/region/${region}`, {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to filter products");
      }

      return data;
    } catch (error) {
      console.error("Filter Products Error:", error);
      throw error;
    }
  },

  // Get product statistics (Admin only)
  getStatistics: async () => {
    try {
      const response = await authenticatedFetch("/products/statistics", {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch statistics");
      }

      return data;
    } catch (error) {
      console.error("Get Statistics Error:", error);
      throw error;
    }
  },

  // Get price trend for a product (7-day data)
  getPriceTrend: async (productId) => {
    try {
      const response = await authenticatedFetch(
        `/products/${productId}/price-trend`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch price trend");
      }

      return data;
    } catch (error) {
      console.error("Get Price Trend Error:", error);
      throw error;
    }
  },
};

export default productService;

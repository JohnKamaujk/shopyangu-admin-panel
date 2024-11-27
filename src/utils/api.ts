const BASE_URL = "http://localhost:3001";

export const getProducts = async (page: number = 1, limit: number = 6) => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const allProducts = await response.json();
  const paginatedProducts = allProducts.slice((page - 1) * limit, page * limit);

  const totalPages = Math.ceil(allProducts.length / limit);

  return {
    data: paginatedProducts,
    totalPages,
  };
};

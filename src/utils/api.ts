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

export const createProduct = async (
  product: {
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
    shopId: number;
  },
  setIsLoading: (loading: boolean) => void
): Promise<any> => {
  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    const createdProduct = await response.json();

    return createdProduct;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create product");
  } finally {
    setIsLoading(false);
  }
};

export const updateProduct = async (updatedProduct: any) => {
  const response = await fetch(
    `http://localhost:3001/products/${updatedProduct.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return await response.json();
};

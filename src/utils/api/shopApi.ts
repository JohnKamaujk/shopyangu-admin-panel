const BASE_URL = "http://localhost:3001";

export const getShops = async (page: number = 1, limit: number = 6) => {
  const response = await fetch(`${BASE_URL}/shops`);

  if (!response.ok) {
    throw new Error("Failed to fetch shops");
  }

  const allShops = await response.json();
  const paginatedShops = allShops.slice((page - 1) * limit, page * limit);

  const totalPages = Math.ceil(allShops.length / limit);

  return {
    data: paginatedShops,
    totalPages,
  };
};

export const createShop = async (
  shop: {
    name: string;
    description: string;
    logo: string;
  },
  setIsLoading: (loading: boolean) => void
): Promise<any> => {
  setIsLoading(true);

  try {
    const response = await fetch(`${BASE_URL}/shops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shop),
    });

    if (!response.ok) {
      throw new Error("Failed to create shop");
    }

    const createdShop = await response.json();

    return createdShop;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Shop");
  } finally {
    setIsLoading(false);
  }
};

export const updateShop = async (updatedShop: any) => {
  const response = await fetch(`${BASE_URL}/shops/${updatedShop.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedShop),
  });

  if (!response.ok) {
    throw new Error("Failed to update shop");
  }

  return await response.json();
};

export const deleteShop = async (shopId: number): Promise<void> => {
  try {
    const response = await fetch(`${BASE_URL}/shops/${shopId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete shop");
    }
  } catch (error) {
    console.error(error);
  }
};

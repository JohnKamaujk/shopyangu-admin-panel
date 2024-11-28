"use client";

import React, { useEffect, useState } from "react";
import { getShopById, getShopProducts } from "@/utils/api/shopApi";
import Link from "next/link";

type Props = {
  params: { id: string };
};

const ShopDetails = ({ params }: Props) => {
  const { id } = params;

  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shopData = await getShopById(id);
        const productsData = await getShopProducts(id);
        setShop(shopData);
        setProducts(productsData);
      } catch (err) {
        setError("Failed to load shop or products data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-4 py-6">
      <Link
        href="/shops"
        className="text-blue-600 hover:underline dark:text-blue-400 mb-4 inline-block"
      >
        &larr; Back to Shops
      </Link>

      <h1 className="text-2xl font-bold dark:text-gray-200">{shop.name}</h1>
      <p className="mt-2 dark:text-gray-200">{shop.description}</p>

      <h2 className="mt-6 text-xl font-semibold dark:text-gray-200">
        Products
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="p-4 border rounded">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold dark:text-gray-200">
                {product.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-200">
                {product.description}
              </p>
              <p className="mt-1 text-blue-600 font-bold dark:text-gray-200">
                ${product.price}
              </p>
            </div>
          ))
        ) : (
          <p>No products available for this shop.</p>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;

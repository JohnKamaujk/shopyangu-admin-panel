"use client";

import React, { useEffect, useState } from "react";
import { getShopById, getShopProducts } from "@/utils/api/shopApi";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ModalEditProduct from "@/components/ModalEditProduct";
import { deleteProduct } from "@/utils/api/productApi";

type Props = {
  params: { id: string };
};

const ShopDetails = ({ params }: Props) => {
  const { id } = params;

  const [shop, setShop] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    await deleteProduct(productId);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleProductUpdate = (updatedProduct: any) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

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
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEditClick(product)}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))
        ) : (
          <p>No products available for this shop.</p>
        )}
      </div>
      <ModalEditProduct
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        productToEdit={selectedProduct}
        onProductUpdate={handleProductUpdate}
      />
    </div>
  );
};

export default ShopDetails;

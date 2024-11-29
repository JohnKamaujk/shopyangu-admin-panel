"use client";

import React, { useEffect, useState } from "react";
import ProductHeader from "../../components/ProductHeader";
import Pagination from "@/components/Pagination";
import { deleteProduct, getProducts } from "@/utils/api/productApi";
import ProductCard from "@/components/ProductCard";
import ModalEditProduct from "../../components/ModalEditProduct";

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(currentPage);
        setProducts(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [currentPage, products]);

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

  return (
    <div>
      <ProductHeader />
      <div className="px-4 xl:px-6 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEditClick(product)}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
        <ModalEditProduct
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          productToEdit={selectedProduct}
          onProductUpdate={handleProductUpdate}
        />
      </div>
    </div>
  );
};

export default Product;

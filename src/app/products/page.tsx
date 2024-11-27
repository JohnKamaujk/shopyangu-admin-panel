"use client";

import React, { useEffect, useState } from "react";
import ProductHeader from "./ProductHeader";
import Pagination from "@/components/Pagination";
import { getProducts } from "@/utils/api";
import ProductCard from "@/components/ProductCard";

const Product = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
  }, [currentPage]);

  return (
    <div>
      <ProductHeader />
      <div className="px-4 xl:px-6 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Product;

"use client";

import React, { useEffect, useState } from "react";
import ShopHeader from "../../components/ShopHeader";
import Pagination from "@/components/Pagination";
import { deleteShop, getShops } from "@/utils/api/shopApi";
import ShopCard from "@/components/ShopCard";
import ModalEditShop from "../../components/ModalEditShop";

const Shop = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedShop, setSelectedShop] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await getShops(currentPage);
        setShops(response.data);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Failed to fetch Shops", error);
      }
    };

    fetchShops();
  }, [currentPage, shops]);

  const handleEditClick = (product: any) => {
    setSelectedShop(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteShop = async (shopId: number) => {
    await deleteShop(shopId);
    setShops((prevShops) => prevShops.filter((shop) => shop.id !== shopId));
  };

  return (
    <div>
      <ShopHeader />
      <div className="px-4 xl:px-6 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onEdit={() => handleEditClick(shop)}
              onDelete={() => handleDeleteShop(shop.id)}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
        <ModalEditShop
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          shopToEdit={selectedShop}
        />
      </div>
    </div>
  );
};

export default Shop;

"use client";

import React, { useEffect, useState } from "react";
import ShopHeader from "../../components/ShopHeader";
import Pagination from "@/components/Pagination";
import { deleteShop, getShopProducts, getShops } from "@/app/api/shopApi";
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
  }, [currentPage]);

  const handleEditClick = (product: any) => {
    setSelectedShop(product);
    setIsEditModalOpen(true);
  };

  const handleDeleteShop = async (shopId: string) => {
    try {
      const shopProducts = await getShopProducts(shopId);
      if (shopProducts.length > 0) {
        alert(
          "This shop cannot be deleted because there are products associated with it."
        );
        return;
      }
      const confirmed = confirm("Are you sure you want to delete this shop?");
      if (confirmed) {
        await deleteShop(shopId);
        setShops((prevShops) => prevShops.filter((shop) => shop.id !== shopId));
      }
    } catch (error) {
      console.error("Failed to delete shop", error);
      alert("An error occurred while trying to delete the shop.");
    }
  };

  const handleShopUpdate = (updatedShop: any) => {
    setShops((prevShops) =>
      prevShops.map((shop) => (shop.id === updatedShop.id ? updatedShop : shop))
    );
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
          onShopUpdate={handleShopUpdate}
        />
      </div>
    </div>
  );
};

export default Shop;

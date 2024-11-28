import Header from "@/components/Header";
import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import ModalNewShop from "../ModalNewShop";

const ShopHeader = () => {
  const [isModalNewShopOpen, setIsModalNewShopOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      <ModalNewShop
        isOpen={isModalNewShopOpen}
        onClose={() => setIsModalNewShopOpen(false)}
      />
      <div className="pb-3 pt-3 lg:pb-4 lg:pt-4">
        <Header
          name="Manage Shops"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewShopOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> Add Shop
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ShopHeader;

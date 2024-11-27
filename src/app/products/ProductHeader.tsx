import Header from "@/components/Header";
import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import ModalNewProduct from "./ModalNewProduct";



const ProductHeader = () => {
  const [isModalNewProductOpen, setIsModalNewProductOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      <ModalNewProduct
        isOpen={isModalNewProductOpen}
        onClose={() => setIsModalNewProductOpen(false)}
        
      />
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header
          name="Products Management page"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProductOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> Add Product
            </button>
          }
        />
      </div>
    </div>
  );
};

export default ProductHeader;

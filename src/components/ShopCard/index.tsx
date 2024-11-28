import React, { useState } from "react";
import ModalNewProduct from "../ModalNewProduct";
import Link from "next/link";

type ShopCardProps = {
  shop: {
    id: string;
    name: string;
    description: string;
    logo: string;
  };
  onEdit: () => void;
  onDelete: () => void;
};

const ShopCard = ({ shop, onEdit, onDelete }: ShopCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="border dark:border-gray-500 rounded-lg p-4 hover:shadow-md">
      <img
        src={shop.logo}
        alt={shop.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      {/* Shop Name and View Button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold dark:text-gray-200">
          {shop.name}
        </h3>
        <Link
          href={`/shops/${shop.id}`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          View Shop
        </Link>
      </div>

      {/* Shop Description */}
      <p className="text-gray-600 dark:text-gray-200 mb-4">
        {shop.description}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-md"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={onDelete}
        >
          Delete
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleAddProduct}
        >
          Add Products
        </button>
      </div>

      {/* Modal for Adding Products */}
      {isModalOpen && (
        <ModalNewProduct
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          prefilledShopId={shop.id}
        />
      )}
    </div>
  );
};

export default ShopCard;

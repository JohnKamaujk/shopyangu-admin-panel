import React from "react";

type ProductCardProps = {
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
  };
  onEdit: () => void;
  onDelete: () => void;
};

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <div className="border dark:border-gray-500 rounded-lg p-4 hover:shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold dark:text-gray-200">
        {product.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-200">{product.description}</p>
      <p className="mt-2 text-blue-600">${product.price}</p>
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
      </div>
    </div>
  );
};

export default ProductCard;

import Modal from "@/components/Modal";
import { createProduct } from "@/app/api/productApi";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  prefilledShopId?: string;
};

const ModalNewProduct = ({ isOpen, onClose, prefilledShopId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const shopId = prefilledShopId || "";

  const handleSubmit = async () => {
    if (!name || !price || !stock || !description || !image || !shopId) return;

    await createProduct(
      {
        name,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        description,
        image,
        shopId,
      },
      setIsLoading
    );

    setName("");
    setPrice("");
    setStock("");
    setDescription("");
    setImage("");
    onClose();
  };

  const isFormValid = () => {
    return (
      name &&
      price &&
      !isNaN(parseFloat(price)) &&
      stock &&
      !isNaN(parseInt(stock, 10)) &&
      description &&
      image &&
      shopId
    );
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Product">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className={inputStyles}
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          className={inputStyles}
          placeholder="Stock Quantity"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="url"
          className={inputStyles}
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="string"
          className={`${inputStyles} cursor-not-allowed bg-gray-200`}
          placeholder="Shop ID"
          value={shopId}
          disabled
        />
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProduct;

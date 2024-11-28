import Modal from "@/components/Modal";
import { createShop } from "@/utils/api/shopApi";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProduct = ({ isOpen, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = async () => {
    if (!name || !description || !logo) return;

    await createShop(
      {
        name,
        description,
        logo,
      },
      setIsLoading
    );

    setName("");
    setDescription("");
    setLogo("");
    onClose();
  };

  const isFormValid = () => {
    return (
      name &&
      description &&
      logo
    );
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Shop">
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
          placeholder="Shop Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
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

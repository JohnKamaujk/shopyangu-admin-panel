import Modal from "@/components/Modal";
import { updateShop } from "@/app/api/shopApi";
import { useState, useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  shopToEdit?: any;
  onShopUpdate: (updatedShop: any) => void;
};

const ModalEditShop = ({
  isOpen,
  onClose,
  shopToEdit,
  onShopUpdate,
}: Props) => {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shopToEdit) {
      setShopName(shopToEdit.name);
      setDescription(shopToEdit.description);
      setLogo(shopToEdit.logo);
    }
  }, [shopToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const updatedShop = {
      ...shopToEdit,
      name: shopName,
      description,
      logo,
    };

    try {
      const shop = await updateShop(updatedShop);
      onShopUpdate(shop);
      onClose();
    } catch (error) {
      console.error("Error updating Shop:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Shop">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Shop Name"
          className="w-full rounded border p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          placeholder="Image URL"
          className="w-full rounded border p-2"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-500 text-white rounded py-2 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalEditShop;

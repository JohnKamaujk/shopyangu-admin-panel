import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import { updateProduct } from "@/utils/api/productApi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: any;
  onProductUpdate: (updatedProduct: any) => void;
};

const ModalEditProduct = ({
  isOpen,
  onClose,
  productToEdit,
  onProductUpdate,
}: Props) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [shopId, setShopId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setProductName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
      setImage(productToEdit.image);
      setShopId(productToEdit.shopId);
    }
  }, [productToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const updatedProduct = {
      ...productToEdit,
      name: productName,
      description,
      price,
      stock,
      image,
      shopId,
    };

    try {
      const product = await updateProduct(updatedProduct);
      onProductUpdate(product);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Edit Product">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
          className="w-full rounded border p-2"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full rounded border p-2"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Price"
          className="w-full rounded border p-2"
        />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          placeholder="Stock"
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          className="w-full rounded border p-2"
        />
        <input
          type="number"
          value={shopId}
          onChange={(e) => setShopId(Number(e.target.value))}
          placeholder="Shop ID"
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

export default ModalEditProduct;

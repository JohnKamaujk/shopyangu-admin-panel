import Link from "next/link";
import { PlusSquare } from "lucide-react";
import React from "react";

const ProductHeader = () => {
  return (
    <div className="px-4 xl:px-6">
      <div className="flex items-center justify-between pb-2 pt-2 lg:pb-2 lg:pt-3">
        <h1 className="text-2xl font-semibold dark:text-white">
          Manage Products
        </h1>
        <div>
          <Link
            href="/shops"
            className="inline-flex items-center rounded-md bg-blue-primary px-4 py-2 text-white hover:bg-blue-600"
          >
            <PlusSquare className="mr-2 h-5 w-5" />
            <span className="whitespace-nowrap">Add shop products</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;

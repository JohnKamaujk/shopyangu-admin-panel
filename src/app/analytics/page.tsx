"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getShops, getShopProducts } from "@/app/api/shopApi";

// Define the type for a shop's analytics data
interface ShopAnalyticsData {
  name: string;
  products: number;
}

const AnalyticsPage = () => {
  const [shopsWithProducts, setShopsWithProducts] = useState<
    ShopAnalyticsData[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const { data: shops } = await getShops();
        const shopsData: ShopAnalyticsData[] = await Promise.all(
          shops.map(async (shop: any) => {
            const products = await getShopProducts(shop.id);
            return {
              name: shop.name,
              products: products.length,
            };
          })
        );
        setShopsWithProducts(shopsData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 dark:text-gray-200">
        Shop Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Products per Shop */}
        <div className="bg-white dark:bg-black dark:text-gray-200 p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4 ">Products per Shop</h2>
          <BarChart width={400} height={300} data={shopsWithProducts}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="products" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Pie Chart: Products per Shop */}
        <div className="bg-white dark:bg-black dark:text-gray-200 p-4 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Products Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={shopsWithProducts}
              dataKey="products"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {shopsWithProducts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

"use client";
import React, { useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import { CategoryData } from "@/types";

interface CategoryManagerProps {
  initialCategories: CategoryData[];
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  initialCategories,
}) => {
  const [categories, setCategories] =
    useState<CategoryData[]>(initialCategories);

  const handleCategoryDelete = async (categoryId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${categoryId}`
      );

      // Remove the deleted category from the state
      setCategories(
        categories.filter((category) => category.value !== categoryId)
      );
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  return (
    <div className=" bg-white shadow-lg min-h-[200px] rounded-lg p-5">
      <h2 className=" font-semibold text-lg">Delete blog categories</h2>
      <p className=" text-sm mb-3 text-gray-500">
        Ensure the category is no longer in use before deleting.
      </p>
      <div className="flex gap-5 flex-wrap">
        {categories.map((category) => (
          <div
            key={category.value}
            className=" w-fit h-fit py-2 px-3 border flex items-center"
          >
            <span>{category.label}</span>
            <button onClick={() => handleCategoryDelete(category.value)}>
              <Trash className="ml-3 size-4 text-red-600" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;

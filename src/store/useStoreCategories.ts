import { CategoriesEntity } from "@/entity/CategoriesEntity";
import { create } from "zustand";

interface CategoryStore {
  category: CategoriesEntity;
  clearCategory: () => void;
  setCategory: (value: CategoriesEntity) => void;
}

const useStoreCategories = create<CategoryStore>((set) => ({
  category: { id: "", name: "", slug: "" },
  clearCategory: () =>
    set({ category: { id: "", name: "", slug: "" } as CategoriesEntity }),
  setCategory: (value) => set({ category: value }),
}));

export default useStoreCategories;

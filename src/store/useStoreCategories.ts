import { CategoriesEntity } from "@/entity/CategoriesEntity";
import { create } from "zustand";

type State = {
  category: CategoriesEntity;
};
type Action = {
  clearCategory: () => void;
  setCategory: (value: CategoriesEntity) => void;
};
const useStoreCategories = create<State & Action>((set) => ({
  category: { id: "", name: "", slug: "" },
  clearCategory: () =>
    set({ category: { id: "", name: "", slug: "" } as CategoriesEntity }),
  setCategory: (value) => set({ category: value }),
}));

export default useStoreCategories;

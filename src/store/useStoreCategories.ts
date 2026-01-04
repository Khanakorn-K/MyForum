import { CategoriesEntity } from "@/entity/CategoriesEntity";
import { create } from '@/store/restAllStore';
type State = {
  selectCategory: CategoriesEntity;
};
type Action = {
  clearCategory: () => void;
  setCategory: (value: CategoriesEntity) => void;
};
const useStoreCategories = create<State & Action>((set) => ({
  selectCategory: { id: "", name: "", slug: "" },
  clearCategory: () =>
    set({ selectCategory: { id: "", name: "", slug: "" } as CategoriesEntity }),
  setCategory: (value) => set({ selectCategory: value }),
}));

export default useStoreCategories;

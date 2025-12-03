import { TagsEntity } from "@/entity/TagsEntity";
import { create } from "zustand";

interface TagStore {
  tag: TagsEntity;
  clearTag: () => void;
  setTag: (value: TagsEntity) => void;
}

const useStoreTag = create<TagStore>((set) => ({
  tag: { id: "", name: "", slug: "" } as TagsEntity,
  clearTag: () => set({ tag: { id: "", name: "", slug: "" } as TagsEntity }),
  setTag: (value) => set({ tag: value }),
}));

export default useStoreTag;

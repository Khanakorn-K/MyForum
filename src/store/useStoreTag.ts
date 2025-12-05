import { TagsEntity } from "@/entity/TagsEntity";
import { create } from "zustand";

type State = {
  tag: TagsEntity;
};
type Action = {
  clearTag: () => void;
  setTag: (value: TagsEntity) => void;
};

const useStoreTag = create<State & Action>((set) => ({
  tag: { id: "", name: "", slug: "" } as TagsEntity,
  clearTag: () => set({ tag: { id: "", name: "", slug: "" } as TagsEntity }),
  setTag: (value) => set({ tag: value }),
}));

export default useStoreTag;

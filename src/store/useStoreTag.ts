import { TagsEntity } from "@/entity/TagsEntity";
import { create } from '@/store/restAllStore';
type State = {
  selectTag: TagsEntity;
};
type Action = {
  clearTag: () => void;
  setTag: (value: TagsEntity) => void;
};

const useStoreTag = create<State & Action>((set) => ({
  selectTag: { id: "", name: "", slug: "" } as TagsEntity,
  clearTag: () => set({ selectTag: { id: "", name: "", slug: "" } as TagsEntity }),
  setTag: (value) => set({ selectTag: value }),
}));

export default useStoreTag;

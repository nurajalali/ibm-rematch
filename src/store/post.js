import { createModel } from "@rematch/core";

export const PostModel = createModel({
  state: {
    posts: [],
    loading: true,
    openModal: false,
    form: {
      title: "",
      paragraph: "",
    },
  },
  reducers: {},
  effects: () => {},
});

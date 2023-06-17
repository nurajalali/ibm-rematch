import { init } from "@rematch/core";
import { PostModel } from "./post";

export const store = init({
  models: {
    PostModel,
  },
});

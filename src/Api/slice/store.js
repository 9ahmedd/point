import { configureStore } from "@reduxjs/toolkit";
import ApiPost from "./ApiPost";
import ApiGet from "./ApiGet";


const store = configureStore({
  reducer: {
    posts: ApiPost,
    gets:ApiGet,
  },
});
export default store;

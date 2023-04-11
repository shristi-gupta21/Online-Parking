import { configureStore } from "@reduxjs/toolkit";
import GenerateSlices from "../features/GenerateSlices";
import userSlices from "../features/UserSlices";

export default configureStore({
  reducer: {
    slot: GenerateSlices,
    user: userSlices,
  },
});

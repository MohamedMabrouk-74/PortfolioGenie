import { configureStore } from "@reduxjs/toolkit";
import builderReducer from "../features/builder/store/builderSlice";

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
});

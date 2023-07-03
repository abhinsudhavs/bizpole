import { configureStore } from "@reduxjs/toolkit";
import testSliceReducer from "./testSlice";

const store = configureStore({
  reducer: {
    test: testSliceReducer,
  },
});

export default store;

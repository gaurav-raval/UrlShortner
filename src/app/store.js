import { configureStore } from "@reduxjs/toolkit";
import linkReducer from '../features/linkSlice'
// import { l } from "vite/dist/node/types.d-aGj9QkWt";
export const store = configureStore({
    reducer :linkReducer
})
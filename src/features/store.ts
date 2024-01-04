import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./coins/coinSlice";

export const store = configureStore({
    reducer:{
        coins:coinSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
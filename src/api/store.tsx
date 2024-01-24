import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./Plaseholder";
import stateSlice from "./redux"

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [stateSlice.name]: stateSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TState = {
  offset: number,
};

const initialState: TState = {
  offset: 0
}

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    }
  }
})

export const { setOffset } = stateSlice.actions;

export default stateSlice;
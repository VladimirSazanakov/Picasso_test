import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TState = {
  offset: number,
  posts: Array<any>
};

const initialState: TState = {
  offset: 0,
  posts: [],
}

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    setOffset(state, action: PayloadAction<number>) {
      state.offset = action.payload;
    },
    addPosts(state, action: PayloadAction<Array<any>>) {
      state.posts = state.posts.concat(action.payload);
    }

  }
})

export const { setOffset, addPosts } = stateSlice.actions;

export default stateSlice;
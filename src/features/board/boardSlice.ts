import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BoardState {
  value: number;
}

const initialState: BoardState = {
  value: 0,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoard: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { getBoard, incrementByAmount } = boardSlice.actions;

export default boardSlice.reducer;

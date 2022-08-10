import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { nanoid } from 'nanoid';
import {
  BoardState,
  ChangeTitleCardProps,
  DeleteCardProps,
  ChangeTitleСolumnProps,
  AddCardProps,
} from './types';

const itemsFromBackend = [
  { id: nanoid(), content: 'First task' },
  { id: nanoid(), content: 'Second task' },
  { id: nanoid(), content: 'Third task' },
  { id: nanoid(), content: 'Fourth task' },
  { id: nanoid(), content: 'Fifth task' },
];

const columnsFromBackend = [
  {
    name: 'Requested',
    items: itemsFromBackend,
    id: nanoid(),
  },
  {
    name: 'To do',
    items: [],
    id: nanoid(),
  },
  {
    name: 'In Progress',
    items: [],
    id: nanoid(),
  },
  {
    name: 'Done',
    items: [],
    id: nanoid(),
  },
];

const initialState: BoardState = {
  board: columnsFromBackend,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reorderBoard: (state, action: PayloadAction<BoardState['board']>) => {
      state.board = action.payload;
    },
    deleteСolumn: (state, action: PayloadAction<string>) => {
      state.board = state.board.filter((el) => el.id !== action.payload);
    },
    deleteCard: (state, action: PayloadAction<DeleteCardProps>) => {
      const { index, id } = action.payload;
      state.board[index].items = state.board[index].items.filter((el) => el.id !== id);
    },
    addColumn: (state, action: PayloadAction<string>) => {
      const column = { name: action.payload, id: nanoid(), items: [] };
      state.board.push(column);
    },
    addCard: (state, action: PayloadAction<AddCardProps>) => {
      const { index, text } = action.payload;

      const card = { id: nanoid(), content: text };
      state.board[index].items.push(card);
    },
    changeTitleСolumn: (state, action: PayloadAction<ChangeTitleСolumnProps>) => {
      const { index, text } = action.payload;

      state.board[index].name = text;
    },
    changeTitleCard: (state, action: PayloadAction<ChangeTitleCardProps>) => {
      const { indexColumn, indexCard, text } = action.payload;
      state.board[indexColumn].items[indexCard].content = text;
    },
  },
});

export const {
  reorderBoard,
  deleteСolumn,
  deleteCard,
  changeTitleСolumn,
  changeTitleCard,
  addColumn,
  addCard,
} = boardSlice.actions;

export default boardSlice.reducer;

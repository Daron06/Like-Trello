import boardSlice from './features/board/boardSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { board: boardSlice },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

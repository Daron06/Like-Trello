import { createStore } from 'redux';

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action) => {
  console.log('Мы начали');

  return state;
};

const store = createStore(reducer);

export default store;

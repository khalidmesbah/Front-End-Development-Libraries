import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
// constants
const GET_QUOTES = "GET_QUOTES";
// action creators
const getQuotes = (quotes) => {
  return {
    type: GET_QUOTES,
    quotes,
  };
};
// async action creators
export const fetchQuotes = () => {
  return async (dispatch) => {
    const res = await fetch("https://type.fit/api/quotes");
    const data = await res.json();
    dispatch(getQuotes(data));
  };
};
// reducers
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_QUOTES:
      return action.quotes;
    default:
      return state;
  }
};
// store
const store = createStore(reducer, applyMiddleware(thunk));
store.dispatch(fetchQuotes());
export default store;

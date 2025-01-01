import { Middleware } from "@reduxjs/toolkit";

const favoriteMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem("favorite", JSON.stringify(state.favorite));
  return result;
};

export default favoriteMiddleware;

import { configureStore } from "@reduxjs/toolkit";
import crudReducer from "../features/expenseSlice";
import authReducer from "../features/authSlice";
import budgetReducer from "../features/budgetSlice";
import { loadState, saveState } from "../features/budgetLocalStorage";
import toastReducer from "../features/toastSlice";

const persistedState = loadState();
// console.log(typeof(persistedState));

const store = configureStore({
  reducer: {
    crud: crudReducer,
    auth: authReducer,
    bud: budgetReducer,
    tst: toastReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;

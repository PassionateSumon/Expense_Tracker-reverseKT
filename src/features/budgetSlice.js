import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  budget: [],
};
// console.log(state.budget)

const budgetSlice = createSlice({
  name: "cost",
  initialState,
  reducers: {
    addCost: (state, action) => {
      // console.log(state.budget)
      const { text, cost } = action.payload;
      const exp = {
        id: nanoid(),
        text,
        cost,
        purchasedCost: 0,
        remainingCost: cost,
      };
      state.budget.push(exp);
    },

    removeCost: (state, action) => {
      console.log(state);
      state.budget = state.budget.filter((exp) => exp.id !== action.payload);
    },

    updateCost: (state, action) => {
      const { id, text, cost } = action.payload;
      state.budget = state.budget.map((item) => {
        if (item.id === id) {
          item.text = text;
          item.cost = parseInt(cost);
          item.remainingCost = parseInt(cost) - item.purchasedCost;
        }
        return item;
      });
    },

    addingPurchaseCost: (state, action) => {
      const { id, cost } = action.payload;
      const prev = state.budget.find((item) => item.id === id);
      if (prev) {
        if (cost > 0) {
          prev.purchasedCost += parseInt(cost);
          prev.remainingCost -= parseInt(cost);
        }
      }
    },
  },
});

export const { addCost, removeCost, updateCost, addingPurchaseCost } =
  budgetSlice.actions;
export default budgetSlice.reducer;

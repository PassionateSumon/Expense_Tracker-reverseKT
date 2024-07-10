import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  budget: [],
};

const budgetSlice = createSlice({
  name: "cost",
  initialState,
  reducers: {
    addCost: (state, action) => {
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
      state.budget = state.budget.filter((exp) => exp.id !== action.payload);
    },

    updateCost: (state, action) => {
      const { id, text, cost } = action.payload;
      const prev = state.budget.find((item) => item.id === id);
      if (prev) {
        prev.text = text;
        prev.cost = cost;
      }
    },

    addingPurchaseCost: (state, action) => {
      const { id, cost } = action.payload;
      const prev = state.budget.find((item) => item.id === id);
      if (prev) {
        prev.purchasedCost += parseInt(cost);
        prev.remainingCost -= parseInt(cost);
      }
    },
  },
});

export const { addCost, removeCost, updateCost, addingPurchaseCost } =
  budgetSlice.actions;
export default budgetSlice.reducer;

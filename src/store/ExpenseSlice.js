import { createSlice } from "@reduxjs/toolkit";

const initial = {
  expenseItem: [],
  total: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initial,
  reducers: {
    addExpense(state, action) {
      state.expenseItem = [...action.payload];
      const item = state.expenseItem;
      state.total = item.reduce((acc, cur) => {
        return acc + cur.moneySpent;
      }, 0);
    },
  },
});

export const expenseSliceActions = expenseSlice.actions;
export default expenseSlice;

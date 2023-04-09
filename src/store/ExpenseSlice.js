import { createSlice } from "@reduxjs/toolkit";

const initial = {
  expenseItem: [],
  total: 0,
};

console.log(initial.expenseItem, "jakeer");
const expenseSlice = createSlice({
  name: "expense",
  initialState: initial,
  reducers: {
    addExpense(state, action) {
      state.expenseItem = [...action.payload];

      // state.expenseItem = [...action.payload];
      //  state.expenseItem = [...state.expenseItem, action.payload]
      //  console.log(state,"jjjj")
      //  state.total = state.total + action.payload.amount
    },
    removeExpense() {},
  },
});

export const expenseSliceActions = expenseSlice.actions;
export default expenseSlice;

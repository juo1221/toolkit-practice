import { createSlice } from "@reduxjs/toolkit";
import cartList from "../cartItems";

const initialState = {
  cartItems: cartList,
  amount: 4,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    increase: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload);
      if (!item) return;
      item.amount = item.amount + 1;
    },
    decrease: (state, { payload }) => {
      const item = state.cartItems.find((item) => item.id === payload);
      if (!item || item.amount <= 0) return;
      item.amount = item.amount - 1;
    },
    calculateTotals: (state) => {
      let totalPrice = 0;
      let totalAmount = 0;
      state.cartItems.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.amount * Number(item.price);
      });
      state.amount = totalAmount;
      state.total = totalPrice;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;

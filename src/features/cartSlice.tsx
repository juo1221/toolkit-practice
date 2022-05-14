import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import cartList from "../cartItems";
import { Items } from "./types";
import { TInitialState, FetchTodosError } from "./types";

const URL = "https://course-api.com/react-useReducer-cart-project";

const initialState: TInitialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: false,
};

export const getCartItems = createAsyncThunk<
  Items[],
  void,
  { rejectValue: FetchTodosError }
>("cart/getCartItems", async (_, thunkAPI) => {
  try {
    const data: Items[] = await (await fetch(URL)).json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: "something went wrong" });
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    increase: (state, { payload }: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === payload);
      if (!item) return;
      item.amount = item.amount + 1;
    },
    decrease: (state, { payload }: PayloadAction<string>) => {
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
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.cartItems = payload;
      })
      .addCase(getCartItems.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;

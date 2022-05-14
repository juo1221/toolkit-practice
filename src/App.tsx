import { useEffect } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CartContainer from "./components/CartContainer";
import { calculateTotals, getCartItems } from "./features/cartSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

function App() {
  const { cartItems, isLoading } = useAppSelector((store) => store.cart);
  const { isOpen } = useAppSelector((store) => store.modal);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    (async () => {
      const resultAction = await dispatch(getCartItems());
      const res = unwrapResult(resultAction);
      console.log(res);
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;

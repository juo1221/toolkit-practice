import { useEffect } from "react";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { calculateTotals } from "./features/cartSlice";
import { useAppDispatch, useAppSelector } from "./store/store";

function App() {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;

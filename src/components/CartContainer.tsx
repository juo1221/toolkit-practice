import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "../store/store";
import { openModal } from "../features/modalSlice";
const CartContainer = () => {
  const dispatch = useAppDispatch();
  const { cartItems, amount, total } = useAppSelector((store) => store.cart);

  //   if (amount < 1) {
  //     return (
  //       <section className="cart">
  //         <header>
  //           <h2>your bag</h2>
  //           <h4 className="empty-cart">is currently empty</h4>
  //         </header>
  //       </section>
  //     );
  //   }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>{total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          clear cart
        </button>
      </footer>
    </section>
  );
};
export default CartContainer;

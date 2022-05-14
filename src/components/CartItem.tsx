import { ChevronDown, ChevronUp } from "../icons";
import { useAppDispatch } from "../store/store";
import { removeItem, increase, decrease } from "../features/cartSlice";

export type Items = {
  id: string;
  img: string;
  title: string;
  price: string;
  amount: number;
};

const CartItem: React.FC<Items> = ({ id, img, title, price, amount }) => {
  const dispatch = useAppDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        <button className="amount-btn" onClick={() => dispatch(increase(id))}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={() => dispatch(decrease(id))}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};
export default CartItem;

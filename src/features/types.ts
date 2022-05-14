export type Items = {
  id: string;
  img: string;
  title: string;
  price: string;
  amount: number;
};

export type TInitialState = {
  cartItems: Items[];
  amount: number;
  total: number;
  isLoading: boolean;
};

export type FetchTodosError = {
  message: string;
};

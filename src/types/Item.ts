export type BaseItem = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
};

export type DetailedItem = BaseItem & {
  sold_quantity: number;
  description: string;
};

export interface Items {
  dataset: Item[]
}

export interface Item {
  id: number;
  item_name: string;
  item_weight: number;
  item_price: number;
  item_type: string;
}
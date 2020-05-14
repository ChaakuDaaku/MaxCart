import { Items } from "../../models/Items";
import { Cards } from "../../models/Cards";
import { CartItem } from "../../models/CartItems";

export interface ConfState {
  dataset: Items;
  cardsDataset: Cards;
  cart: CartItem[];
  loading?: boolean;
  searchText?: string;
}
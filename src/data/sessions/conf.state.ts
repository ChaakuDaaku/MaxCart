import { Items } from "../../models/Items";
import { Cards } from "../../models/Cards";

export interface ConfState {
  dataset: Items;
  cardsDataset: Cards;
  cart: number[];
  loading?: boolean;
  searchText?: string;
}
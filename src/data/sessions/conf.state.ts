import { Items } from "../../models/Items";

export interface ConfState {
    dataset : Items;
    cart: number[];
    loading?:boolean;
    searchText?: string;
}
import { Items } from "../../models/Items";

export interface ConfState {
    dataset : Items;
    cart: number[];
    menuEnabled: boolean;
    loading?:boolean;
    searchText?: string;
}
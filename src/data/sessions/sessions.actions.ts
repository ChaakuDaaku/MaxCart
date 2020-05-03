import { ActionType } from "../../utils/types";
import { getItemData } from "../dataApi";
import { ConfState } from "./conf.state";

export const loadItemData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getItemData();
  dispatch(setData(data));
  dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
  type: 'set-conf-loading',
  isLoading
} as const);

export const setData = (data: Partial<ConfState>) => ({
  type: 'set-conf-data',
  data
} as const);

export const setSearchText = (searchText?: string) => ({ 
  type: 'set-search-text', 
  searchText 
} as const);

export const addToCart = (itemId: number) => ({
  type: 'add-to-cart',
  itemId
} as const);

export const removeFromCart = (itemId: number) => ({
  type: 'remove-from-cart',
  itemId
} as const);

export type SessionsActions = 
    | ActionType<typeof setLoading>
    | ActionType<typeof setData>
    | ActionType<typeof setSearchText>
    | ActionType<typeof addToCart>
    | ActionType<typeof removeFromCart>
import { AppState } from "./state";
import { createSelector } from 'reselect';
import { Items, Item } from '../models/Items';

const getItems = (state: AppState) => {
    return state.data.dataset
}

const getSearchText = (state: AppState) => state.data.searchText;
const getCartItemIds = (state: AppState) => state.data.cart;

export const getSearchedItems = createSelector(
    getItems, getSearchText,
    (item_groups, searchText) => {
        if (!searchText) {
            return item_groups;
        }
        
        const item_group: Item[] = [];
        item_groups.dataset.forEach (item => {
            const groupToAdd: Item = {
                id: item.id,
                item_name: item.item_name,
                item_price : item.item_price,
                item_weight: item.item_weight,
                item_type: item.item_type
            }
            item_group.push(groupToAdd)
        });
        return {
            dataset: item_group
        } as Items
    }
)

export const getListItems = createSelector(
    getSearchedItems,
    (item_group) => item_group
)

export const getCartItems = createSelector(
    getListItems, getCartItemIds,
    (item_group, cartItemIds) => {
        const cartItem = item_group.dataset.filter(s => cartItemIds.indexOf(s.id) > -1)
        return {
            dataset: cartItem
        } as Items;
    }
)
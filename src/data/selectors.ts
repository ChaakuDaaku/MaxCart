import { AppState } from "./state";
import { createSelector } from 'reselect';
import { Items, Item } from '../models/Items';
import { Card, Cards } from "../models/Cards";

const getItems = (state: AppState) => {
  return state.data.dataset
}

const getCards = (state: AppState) => {
  return state.data.cardsDataset
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
    item_groups.dataset.forEach(item => {
      const groupToAdd: Item = {
        id: item.id,
        item_name: item.item_name,
        item_price: item.item_price,
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
  (item_group, cartItems) => {
    const cartItem = item_group.dataset.filter(s => cartItems.findIndex(cI=>cI.itemId===s.id) > -1)
    return {
      dataset: cartItem
    } as Items;
  }
)

export const getSearchedCards = createSelector(
  getCards, getSearchText,
  (card_groups, searchText) => {
    if (!searchText) {
      return card_groups;
    }

    const card_group: Card[] = [];
    card_groups.cardsDataset.forEach(card => {
      const groupToAdd: Card = {
        id: card.id,
        card_id: card.card_id,
        business_name: card.business_name,
        card_description: card.card_description,
        delivery_date: card.delivery_date
      }
      card_group.push(groupToAdd)
    });
    return {
      cardsDataset: card_group
    } as Cards
  }
)

export const getCardItems = createSelector(
  getSearchedCards,
  (card_group) => card_group
)
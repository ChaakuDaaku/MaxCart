import { ConfState } from "./conf.state";
import { SessionsActions } from './sessions.actions'

export const sessionReducer = (state: ConfState, action: SessionsActions): ConfState => {
  switch (action.type) {
    case 'set-conf-loading': {
      return { ...state, loading: action.isLoading };
    }
    case 'set-conf-data': {
      return { ...state, ...action.data };
    }
    case 'set-search-text': {
      return { ...state, searchText: action.searchText };
    }
    case 'add-to-cart': {
      if (state.cart.findIndex(item => item.itemId === action.item.itemId) !== -1) {
        state.cart.forEach(item => { if (item.itemId === action.item.itemId) { item.itemQty++ } });
        return { ...state, cart: [...(state.cart)] };
      } else {
        return { ...state, cart: [...(state.cart), action.item] };
      }
    }
    case 'remove-from-cart': {
      var qty: number = state.cart[state.cart.findIndex(item => item.itemId === action.itemId)].itemQty;
      if (qty === 1) {
        return { ...state, cart: state.cart.filter(x => x.itemId !== action.itemId) };
      }
      else {
        state.cart[state.cart.findIndex(item => item.itemId === action.itemId)].itemQty -= 1;
      }
      return {...state, cart: [...(state.cart)]};
    }
  }
}

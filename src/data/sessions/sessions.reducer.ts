import { ConfState } from "./conf.state";
import { SessionsActions } from './sessions.actions'

export const sessionReducer = (state: ConfState, action: SessionsActions): ConfState => {
  var index: number;
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
        console.log([...(state.cart)])
        return { ...state, cart: [...(state.cart)] };
      } else {
        console.log([...(state.cart), action.item]);
        return { ...state, cart: [...(state.cart), action.item] };
      }
    }
    case 'remove-from-cart': {
      index = state.cart.findIndex(item => item.itemId === action.itemId);
      if (index === -1) {
        return state;
      }
      else {
        var qty: number = state.cart[index].itemQty;
        if (qty === 1) {
          return { ...state, cart: state.cart.filter(x => x.itemId !== action.itemId) };
        }
        else {
          state.cart[index].itemQty -= 1;
          return state;
        }
      }
    }
  }
}

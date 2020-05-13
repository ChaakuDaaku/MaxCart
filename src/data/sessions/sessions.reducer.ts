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
      return { ...state, cart: [...(state.cart), action.itemId] };
    }
    case 'remove-from-cart': {
      return { ...state, cart: [...(state.cart).filter(x => x !== action.itemId)] };
    }
  }
}
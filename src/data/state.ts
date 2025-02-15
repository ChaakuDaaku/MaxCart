import { combineReducers } from "./combineReducers";
import { userReducer } from "./user/user.reducer";
import { sessionReducer } from "./sessions/sessions.reducer";

export const initialState: AppState = {
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedIn: false,
    menuEnabled: true,
    loading: false
  },
  data: {
    dataset: { dataset: [] } as any,
    cardsDataset: { cardsDataset: [] as any },
    cart: [],
    loading: false
  }
}

export const reducers = combineReducers({
  user: userReducer,
  data: sessionReducer
})

export type AppState = ReturnType<typeof reducers>;
import { getUserData, setIsLoggedInData, setUsernameData, setHasSeenTutorialData, setDarkModeData, setMenuEnabledData, setAccountTypeData } from "../dataApi";
import { UserState } from "./user.state";
import { ActionType } from "../../utils/types";

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
    dispatch(setLoading(true));
    const data = await getUserData();
    dispatch(setData(data));
    data.darkMode ? dispatch(setDarkMode(false)) : dispatch(setDarkMode(true))
    dispatch(setMenuEnabled(true));
    dispatch(setLoading(false));
}

export const setLoading = (isLoading: boolean) => ({
    type: 'set-user-loading',
    isLoading
} as const);

export const setData = (data: Partial<UserState>) => ({
    type: 'set-user-data',
    data
} as const);

export const logOutUser = () => async (dispatch: React.Dispatch<any>) => {
    await setIsLoggedInData(false);
    dispatch(setUsername());
}

export const setIsLoggedIn = (loggedIn: boolean) => async (dispatch: React.Dispatch<any>) => {
    await setIsLoggedInData(loggedIn);
    return ({
        type: 'set-is-loggedin',
        loggedIn
    } as const)
};

export const setUsername = (username?: string) => async (dispatch: React.Dispatch<any>) => {
    await setUsernameData(username);
    return ({
        type: 'set-username',
        username
    } as const)
};

export const setHasSeenTutorial = (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setHasSeenTutorialData(hasSeenTutorial);
  return ({
    type: 'set-has-seen-tutorial',
    hasSeenTutorial
  } as const);
} 

export const setDarkMode = (darkMode: boolean)=> async (dispatch: React.Dispatch<any>) => {
  await setDarkModeData(darkMode);
  return ({
    type: 'set-dark-mode',
    darkMode
  } as const);
}

export const setMenuEnabled = (menuEnabled: boolean) => async (dispatch: React.Dispatch<any>) => {
  await setMenuEnabledData(menuEnabled);
  return ({
      type: 'set-menu-enabled',
      menuEnabled
  } as const);
}

export const setAccountType = (accountType: string) => async (dispatch: React.Dispatch<any>) => {
  await setAccountTypeData(accountType);
  return ({
    type: 'set-account-type',
    accountType
  } as const);
}

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setIsLoggedIn>
  | ActionType<typeof setUsername>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setDarkMode>
  | ActionType<typeof setMenuEnabled>
  | ActionType<typeof setAccountType>

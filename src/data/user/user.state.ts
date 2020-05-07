export interface UserState {
    isLoggedIn: boolean;
    username?: string;
    darkMode: boolean;
    hasSeenTutorial: boolean;
    loading: boolean;
    menuEnabled: boolean;
    accountType?: string;
}
import { Plugins } from '@capacitor/core';
import { Items } from '../models/Items';
import { Cards } from '../models/Cards';

const { Storage } = Plugins;

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
const USERNAME = 'username';
const MENU_ENABLED = 'menuEnabled';
const DARK_MODE = 'darkMode';
const ACCOUNT_TYPE = 'accountType';

const dataUrl = '/assets/data/items.json';

const cardsDataUrl = '/assets/data/cards.json';

export const getConfData = async () => {
  const response = await Promise.all([
    fetch(dataUrl),
    fetch(cardsDataUrl)
  ])
  const dataset = await response[0].json() as Items;
  const cardsDataset = await response[1].json() as Cards;

  const data = {
    dataset,
    cardsDataset
  }
  return data;
}

export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_LOGGED_IN }),
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: USERNAME }),
    Storage.get({ key: MENU_ENABLED }),
    Storage.get({ key: DARK_MODE}),
    Storage.get({ key: ACCOUNT_TYPE }) ]);
  const isLoggedIn = await response[0].value === 'true';
  const hasSeenTutorial = await response[1].value === 'true';
  const username = await response[2].value || undefined;
  const menuEnabled = await response[3].value === 'true';
  const darkMode = await response[4].value === 'true';
  const accountType = await response[5].value || undefined;
  const data = {
    isLoggedIn,
    hasSeenTutorial,
    username,
    menuEnabled,
    darkMode,
    accountType
  }
  return data;
}

export const setIsLoggedInData = async (isLoggedIn: boolean) => {
  await Storage.set({ key: HAS_LOGGED_IN, value: JSON.stringify(isLoggedIn) });
}

export const setMenuEnabledData = async (menuEnabled: boolean) => {
  await Storage.set({ key: MENU_ENABLED, value: JSON.stringify(menuEnabled) });
}

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({ key: HAS_SEEN_TUTORIAL, value: JSON.stringify(hasSeenTutorial) });
}

export const setDarkModeData = async (darkMode: boolean) => {
  await Storage.set({ key: DARK_MODE, value: JSON.stringify(darkMode)})
}

export const setUsernameData = async (username?: string) => {
  if (!username) {
    await Storage.remove({ key: USERNAME });
  } else {
    await Storage.set({ key: USERNAME, value: username });
  }
}

export const setAccountTypeData = async (accountType?: string) => {
  if (!accountType) {
    await Storage.remove({ key: ACCOUNT_TYPE });
  } else {
    await Storage.set({ key: ACCOUNT_TYPE, value: accountType})
  }
}
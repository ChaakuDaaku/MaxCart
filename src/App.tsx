import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Tutorial from './pages/Tutorial';
import { loadUserData, setIsLoggedIn, setUsername } from './data/user/user.actions';
import { loadItemData } from './data/sessions/sessions.actions'
import { DispatchObject } from './utils/types';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import Login from './pages/Login';
import HomeOrTutorial from './components/HomeOrTutorial';
import Signup from './pages/Signup';
import MainTabs from './pages/MainTabs';
import { Items } from './models/Items';
import Support from './pages/Support';
import Account from './pages/Account';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  item_groups: Items;
}

interface DispatchProps {
  loadItemData: typeof loadItemData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchObject { }

const IonicApp: React.FC<IonicAppProps> = ({darkMode, setIsLoggedIn, setUsername, loadUserData, loadItemData}) => {
  
  useEffect(() => {
    loadUserData();
    loadItemData();
    // eslint-disable-next-line
  }, []);
  
  return (
    <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path='/tabs' component={MainTabs} exact/>
            <Route path="/tutorial" component={Tutorial} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Route path="/account" component={Account} />
            <Route path="/support" component={Support} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/logout" render={() => {
                  setIsLoggedIn(false);
                  setUsername(undefined);
                  return <Redirect to="/login" />
                }} />
            <Route path="/" component={HomeOrTutorial} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    item_groups: state.data.dataset
  }),
  mapDispatchToProps: {loadUserData, setIsLoggedIn, setUsername, loadItemData},
  component: IonicApp
});

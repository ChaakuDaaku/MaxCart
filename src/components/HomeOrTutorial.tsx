import React, { useEffect } from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';
import { loadCardData, loadItemData } from '../data/sessions/sessions.actions';
import { loadUserData } from '../data/user/user.actions';

interface StateProps {
  hasSeenTutorial: boolean;
  isLoggedIn: boolean;
}

interface DispatchProps {
  loadCardData: typeof loadCardData;
  loadUserData: typeof loadUserData;
  loadItemData: typeof loadItemData;
}

interface GoToTabsProps extends StateProps, DispatchProps { }

const GoToTabs: React.FC<GoToTabsProps> = ({ loadItemData, loadCardData, loadUserData}) => {
    useEffect(() => {
      loadUserData();
      loadCardData();
      loadItemData();
      // eslint-disable-next-line
  }, []);
  return <Redirect to="/tabs" />
}

const GoToTabsConnected = connect<{}, StateProps,{}>({
  mapDispatchToProps: {loadUserData, loadCardData, loadItemData},
  component: GoToTabs
})

const successLogin = (status: boolean) =>{
  return status ? <GoToTabsConnected /> : <Redirect to="/login" />
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial, isLoggedIn }) => {
  return hasSeenTutorial ? successLogin(isLoggedIn)  : <Redirect to="/tutorial" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial,
    isLoggedIn: state.user.isLoggedIn
  }),
  component: HomeOrTutorial
});
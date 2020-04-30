import React, { useEffect } from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';
import { loadItemData } from '../data/sessions/sessions.actions';

interface StateProps {
  hasSeenTutorial: boolean;
  isLoggedIn: boolean;
}

const GoToTabs: React.FC<StateProps> = ({ }) => {
    useEffect(() => {
      loadItemData();
      // eslint-disable-next-line
  }, []);
  return <Redirect to="/tabs" />
}

const GoToTabsConnected = connect<{}, StateProps,{}>({
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
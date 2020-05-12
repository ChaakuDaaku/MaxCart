import React from 'react';
import { connect } from '../data/connect';
import { Redirect } from 'react-router';

interface StateProps {
  hasSeenTutorial: boolean;
  isAuthenticated: boolean;
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial, isAuthenticated }) => {
  return hasSeenTutorial ? isAuthenticated ? <Redirect to="/tabs/home" /> : <Redirect to="/login" /> : <Redirect to="/tutorial" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial,
    isAuthenticated: state.user.isLoggedIn
  }),
  component: HomeOrTutorial
});
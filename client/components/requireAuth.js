import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import {hashHistory} from 'react-router'

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps){
      const {loading, user} = nextProps.data
      if(!loading && !user){
        hashHistory.push('/login')
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
};
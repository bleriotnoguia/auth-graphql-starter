import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import mutation from '../mutations/Signup'
import AuthForm from './AuthForm';
import query from '../queries/CurrentUser'
import { hashHistory } from 'react-router'

class SignupForm extends Component {
  constructor(props){
    super(props);
    this.state = { errors: []}
  }

  componentWillUpdate(nextProps){
    // this.props // the old, current set of props
    // nextProps // the next set of props that will be in place
    // when the component rerenders
    if(!this.props.data.user && nextProps.data.user){
      // redirect to dashboard !
      hashHistory.push("/dashboard")
    }
  }

  onSubmit({email, password}){
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query }]
    }).catch(res => {
      const errors = res.graphQLErrors.map(error => error.message)
      this.setState({errors})
    });
  }
  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
      </div>
    )
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
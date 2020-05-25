import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = { is: null };
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_AUTH_ID,
        scope: 'email',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ is: this.auth.isSignedIn.get() });
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    const { signIn, signOut } = this.props;
    if (isSignedIn) {
      signIn();
    } else {
      signOut();
    }
  }

  renderAuthButton() {
    const { is } = this.state;
    if (is === null) {
      return { text: null, action: () => {} };
    } if (is) {
      return ({
        text: 'Sign Out',
        action: () => this.auth.signOut(),
      });
    }

    return ({
      text: 'Sign In with Google',
      action: () => this.auth.signIn(),
    });
  }

  render() {
    const { text, action } = this.renderAuthButton();
    return (
      <button
        onClick={action}
        type="button"
        className="ui red google button"
      >
        <i className="google icon" />
        {text}
      </button>
    );
  }
}

GoogleAuth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default connect(null, { signIn, signOut })(GoogleAuth);

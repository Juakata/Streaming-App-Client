import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_AUTH_ID,
        scope: 'email',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = isSignedIn => {
    const { signIn, signOut } = this.props;
    if (isSignedIn) {
      signIn(this.auth.currentUser.get().getId());
    } else {
      signOut();
    }
  }

  renderAuthButton() {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      return { text: null, action: () => {} };
    } if (isSignedIn) {
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
  isSignedIn: PropTypes.bool,
};

GoogleAuth.defaultProps = {
  isSignedIn: null,
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);

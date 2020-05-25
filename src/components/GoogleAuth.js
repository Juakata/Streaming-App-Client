import React from 'react';

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

  onAuthChange = () => {
    this.setState({ is: this.auth.isSignedIn.get() });
  }

  renderAuthButton() {
    const { is } = this.state;
    if (is === null) {
      return null;
    } if (is) {
      return 'Sign Out';
    }
    return 'Sign In';
  }

  render() {
    return (
      <button type="button" className="ui red google button">
        <i className="google icon" />
        {this.renderAuthButton()}
      </button>
    );
  }
}

export default GoogleAuth;

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    const { fetchStreams } = this.props;
    fetchStreams();
  }

  renderCreateBtn = () => {
    const { isSignedIn } = this.props;
    if (isSignedIn) {
      return (
        <Link className="ui button primary" to="/streams/create">
          Create Stream
        </Link>
      );
    }
    return null;
  }

  renderAdmin = (userId, id) => {
    const { currentUserId } = this.props;
    if (userId === currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${id}`} className="ui button primary">
            Edit
          </Link>
          <Link to={`streams/delete/${id}`} className="ui button negative">
            Delete
          </Link>
        </div>
      );
    }
    return null;
  };

  renderStreams = () => {
    const { streams } = this.props;
    return streams.map(stream => (
      <div className="item" key={stream.id}>
        {this.renderAdmin(stream.userId, stream.id)}
        <i className="large middle iligned icon camera" />
        <div className="content">
          <Link to={`streams/${stream.id}`} className="header">
            {stream.title}
          </Link>
          <div className="description">{stream.description}</div>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderStreams()}</div>
        <div style={{ textAlign: 'right' }}>{this.renderCreateBtn()}</div>
      </div>
    );
  }
}

StreamList.propTypes = {
  fetchStreams: PropTypes.func.isRequired,
  streams: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string,
  isSignedIn: PropTypes.bool,
};

StreamList.defaultProps = {
  currentUserId: -1,
  isSignedIn: false,
};

const mapStateToProps = state => ({
  streams: Object.values(state.streams),
  currentUserId: state.auth.userId,
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);

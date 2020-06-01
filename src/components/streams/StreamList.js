import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    const { fetchStreams } = this.props;
    fetchStreams();
  }

  renderAdmin = id => {
    const { currentUserId } = this.props;
    console.log(id);
    if (id === currentUserId) {
      return (
        <div className="right floated content">
          <button type="button" className="ui button primary">
            Edit
          </button>
          <button type="button" className="ui button negative">
            Delete
          </button>
        </div>
      );
    }
    return null;
  };

  renderStreams = () => {
    const { streams } = this.props;
    return streams.map(stream => (
      <div className="item" key={stream.id}>
        {this.renderAdmin(stream.userId)}
        <i className="large middle iligned icon camera" />
        <div className="content">
          {stream.title}
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
      </div>
    );
  }
}

StreamList.propTypes = {
  fetchStreams: PropTypes.func.isRequired,
  streams: PropTypes.instanceOf(Object).isRequired,
  currentUserId: PropTypes.string,
};

StreamList.defaultProps = {
  currentUserId: -1,
};

const mapStateToProps = state => ({
  streams: Object.values(state.streams),
  currentUserId: state.auth.userId,
});

export default connect(mapStateToProps, { fetchStreams })(StreamList);

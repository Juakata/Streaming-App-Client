import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    const { fetchStreams } = this.props;
    fetchStreams();
  }

  renderStreams = () => {
    const { streams } = this.props;
    return streams.map(stream => (
      <div className="item" key={stream.id}>
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
};

const stateMapToProps = state => ({
  streams: Object.values(state.streams),
});

export default connect(stateMapToProps, { fetchStreams })(StreamList);

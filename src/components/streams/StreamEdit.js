import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  renderStream = () => {
    const { stream } = this.props;
    if (!stream) {
      return <p>Loading...</p>;
    }
    return <p>{stream.title}</p>;
  }

  render() {
    return (
      <div>{this.renderStream()}</div>
    );
  }
}

StreamEdit.propTypes = {
  stream: PropTypes.instanceOf(Object),
  fetchStream: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
};

StreamEdit.defaultProps = {
  stream: null,
};

const stateMapToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(stateMapToProps, { fetchStream })(StreamEdit);

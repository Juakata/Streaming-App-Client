import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  }
}

StreamShow.propTypes = {
  fetchStream: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  stream: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream })(StreamShow);

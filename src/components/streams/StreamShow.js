import React from 'react';
import HJPlayer from 'hjplayer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { fetchStream, match, stream } = this.props;
    const { id } = match.params;
    fetchStream(id);
    this.buildPlayer(id, stream);
  }

  componentDidUpdate() {
    const { match, stream } = this.props;
    const { id } = match.params;
    this.buildPlayer(id, stream);
  }

  componentWillUnmount() {
    this.player.off();
    this.player.destroy();
  }

  buildPlayer = (id, stream) => {
    if (this.player || !stream) {
      return;
    }
    this.player = new HJPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <video style={{ width: '100%' }} ref={this.videoRef} controls />
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  }
}

StreamShow.propTypes = {
  fetchStream: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  stream: PropTypes.instanceOf(Object),
};

StreamShow.defaultProps = {
  stream: null,
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { fetchStream })(StreamShow);

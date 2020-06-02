import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  renderActions = () => {
    const { deleteStream, match } = this.props;
    const { id } = match.params;
    return (
      <>
        <button
          className="ui button negative"
          type="button"
          onClick={() => deleteStream(id)}
        >
          Delete
        </button>
        <button className="ui button" type="button">Cancel</button>
      </>
    );
  }

  renderContent = () => {
    const { stream } = this.props;
    if (!stream) {
      return 'Are you sure you want to delete this stream?';
    }

    return `Are you sure you want to delete "${stream.title}".`;
  };

  render() {
    return (
      <Modal
        header="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

StreamDelete.propTypes = {
  fetchStream: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  stream: PropTypes.instanceOf(Object),
  deleteStream: PropTypes.func.isRequired,
};

StreamDelete.defaultProps = {
  stream: null,
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps,
  { fetchStream, deleteStream })(StreamDelete);

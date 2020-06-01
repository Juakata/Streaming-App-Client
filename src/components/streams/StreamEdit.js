import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    fetchStream(match.params.id);
  }

  onSubmit = formValues => {
    const { editStream, match } = this.props;
    editStream(match.params.id, formValues);
  }

  renderStream = () => {
    const { stream } = this.props;
    if (!stream) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(stream, 'title', 'description')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
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
  editStream: PropTypes.func.isRequired,
};

StreamEdit.defaultProps = {
  stream: null,
};

const stateMapToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(stateMapToProps,
  { fetchStream, editStream })(StreamEdit);

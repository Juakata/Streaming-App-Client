import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = ({ createStream }) => {
  const onSubmit = formValues => {
    createStream(formValues);
  };

  return (
    <div>
      <h3>Create Stream</h3>
      <StreamForm onSubmit={onSubmit} />
    </div>
  );
};

StreamCreate.propTypes = {
  createStream: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createStream },
)(StreamCreate);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const fieldClass = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={fieldClass}>
        <label htmlFor={input.name}>
          {label}
          <input
            id={input.name}
            onChange={input.onChange}
            value={input.value}
            onBlur={input.onBlur}
          />
        </label>
      </div>
    );
  };

  onSubmit = formValues => {
    const { createStream } = this.props;
    createStream(formValues);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
        <Field
          name="title"
          component={this.renderInput}
          label="Title:"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Description:"
        />
        <button type="submit" className="ui button primary">
          Create
        </button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};
  if (!title) {
    errors.title = 'Title must exist.';
  }
  if (!description) {
    errors.description = 'Description must exist.';
  }
  return errors;
};

StreamCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createStream: PropTypes.func.isRequired,
};

export default connect(
  null,
  { createStream },
)(reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate));

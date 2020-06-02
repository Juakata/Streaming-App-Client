import React from 'react';
import Modal from '../Modal';
import history from '../../history';

const StreamDelete = () => {
  const actions = (
    <>
      <button className="ui button negative" type="button">Delete</button>
      <button className="ui button" type="button">Cancel</button>
    </>
  );

  return (
    <Modal
      header="Delete Stream"
      content="Are you sure you want to delete this stream?"
      actions={actions}
      onDismiss={() => history.push('/')}
    />
  );
};

export default StreamDelete;

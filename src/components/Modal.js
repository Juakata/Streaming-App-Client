import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  header, content, actions, onDismiss,
}) => (
  ReactDOM.createPortal(
    <div
      onClick={onDismiss}
      onKeyPress={onDismiss}
      role="button"
      tabIndex={0}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        onKeyPress={e => e.stopPropagation()}
        role="button"
        tabIndex={0}
        className="ui standard modal visible active"
      >
        <div className="header">{header}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector('#modal'),
  )
);

export default Modal;

import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import BackDrop from './Backdrop.jsx';

import './Modal.css';
import { useRef } from 'react';

const ModalOverlay = props => {
  const content = (
    <div
      ref={props.nodeRef}
      className={`modal ${props.className}`}
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : event => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {
  const nodeRef = useRef(null);

  return (
    <>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        timeout={200}
        classNames="modal"
        mountOnEnter
        unmountOnExit
      >
        <ModalOverlay nodeRef={nodeRef} {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;

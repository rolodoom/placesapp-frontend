import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

const SideDrawer = props => {
  const nodeRef = useRef(null);

  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      timeout={2000}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside ref={nodeRef} onClick={props.onClick} className="side-drawer">
        {props.children}
      </aside>
    </CSSTransition>
  );

  // Renders the content in #drawer-hook using a portal
  return createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;

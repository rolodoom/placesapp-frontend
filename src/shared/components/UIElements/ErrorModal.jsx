import { IoCheckmarkSharp } from 'react-icons/io5';

import Modal from './Modal.jsx';
import Button from '../FormElements/Button.jsx';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={
        <Button onClick={props.onClear}>
          <IoCheckmarkSharp /> Okay
        </Button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;

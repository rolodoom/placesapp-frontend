import { useContext, useState } from 'react';
import {
  IoLocationSharp,
  IoCreateOutline,
  IoTrashOutline,
  IoCloseCircle,
  IoCloseCircleOutline,
} from 'react-icons/io5';

import Card from '../../shared/components/UIElements/Card.jsx';
import Button from '../../shared/components/FormElements/Button.jsx';
import Modal from '../../shared/components/UIElements/Modal.jsx';
import Map from '../../shared/components/UIElements/Map.jsx';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.jsx';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.jsx';

import { useHttpClient } from '../../shared/hooks/http-hook.jsx';

import './PlaceItem.css';

import { AuthContext } from '../../shared/context/auth-context.jsx';

const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_API_URL}places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      props.onDelete(`${props.id}`);
    } catch (err) {
      //
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Button onClick={closeMapHandler}>
            <IoCloseCircleOutline /> Close
          </Button>
        }
      >
        <div className="map-container">
          <Map location={props.coordinates} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              <IoCloseCircle /> Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              <IoTrashOutline /> Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? please note that it can
          not be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={
                props.image === 'default-place.png'
                  ? `/img/${props.image}`
                  : props.image
              }
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              <IoLocationSharp /> View on map
            </Button>
            {auth.userId === props.creator && (
              <Button to={`/places/${props.id}`}>
                <IoCreateOutline /> Edit
              </Button>
            )}
            {auth.userId === props.creator && (
              <Button danger onClick={showDeleteWarningHandler}>
                <IoTrashOutline /> Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;

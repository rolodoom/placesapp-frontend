import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ErrorModal from '../../shared/components/UIElements/ErrorModal.jsx';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.jsx';

import { useHttpClient } from '../../shared/hooks/http-hook.jsx';

import PlaceList from '../components/PlaceList.jsx';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  // Extract userId from URL
  const userId = useParams().userId;

  // Send request
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API_URL}places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {
        //
      }
    };
    fetchPlaces();
  }, [sendRequest]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;

import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input.jsx';
import Button from '../../shared/components/FormElements/Button.jsx';
import Card from '../../shared/components/UIElements/Card.jsx';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_URL,
} from '../../shared/util/validators.js';

import { useForm } from '../../shared/hooks/form-hook.jsx';
import { useHttpClient } from '../../shared/hooks/http-hook.jsx';
import { AuthContext } from '../../shared/context/auth-context.jsx';

import ErrorModal from '../../shared/components/UIElements/ErrorModal.jsx';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.jsx';

import './PlaceForm.css';

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      image: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    // Request Place by ID using API
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API_URL}places/${placeId}`
        );
        setLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
            image: {
              value: responseData.place.image,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        //
      }
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  // Handler for the Update Form Submission
  const placeUpdateSubmitHandler = async event => {
    // Prevent default submission
    event.preventDefault();

    // Update Place by ID using API
    try {
      const requestBody = JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        image: formState.inputs.image.value,
      });
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_API_URL}places/${placeId}`,
        'PATCH',
        requestBody,
        {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        }
      );

      // Redirect user to a different page
      navigate(`/${auth.userId}/places`);
    } catch (err) {
      //
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Input
            id="image"
            element="input"
            type="text"
            label="Place Image"
            validators={[VALIDATOR_URL()]}
            errorText="Please enter a URL for the place image."
            onInput={inputHandler}
            initialValue={loadedPlace.image}
            initialValid={true}
          />

          <Button type="submit" disabled={!formState.isValid}>
            <IoCheckmarkCircleOutline /> UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdatePlace;

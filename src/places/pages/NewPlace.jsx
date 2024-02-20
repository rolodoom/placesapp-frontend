import { useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input.jsx';
import Button from '../../shared/components/FormElements/Button.jsx';
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

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
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

  const navigate = useNavigate();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    // console.log(formState.inputs); // send this to the backend later!!!

    try {
      const requestBody = JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
        image: formState.inputs.image.value,
      });

      await sendRequest(
        `${import.meta.env.VITE_BACKEND_API_URL}places`,
        'POST',
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

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <Input
          id="image"
          element="input"
          type="text"
          label="Place Image"
          validators={[VALIDATOR_URL()]}
          errorText="Please enter a URL for the place image."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          <IoAddCircleOutline /> ADD PLACE
        </Button>
      </form>
    </>
  );
};

export default NewPlace;

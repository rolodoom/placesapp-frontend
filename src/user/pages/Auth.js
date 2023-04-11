import React, { useContext, useState } from 'react';
import { IoLogInOutline } from 'react-icons/io5';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
        ...formState.inputs,
        name: {
          value: '',
          isValid: 'false',
        },
      });
    }

    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      const requestBody = JSON.stringify({
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}users/login`,
          'POST',
          requestBody,
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.user.id, responseData.token);
      } catch (error) {
        // console.log('');
      }
    } else {
      const requestBody = JSON.stringify({
        name: formState.inputs.name.value,
        email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      });

      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}users/signup`,
          'POST',
          requestBody,
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.user.id, responseData.token);
      } catch (error) {
        // console.log('');
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? 'Login' : 'SignUp'}</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              label="Your Name"
              type="text"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name."
              onInput={inputHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            label="E-mail"
            type="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter a password (at least 8 characters)"
            onInput={inputHandler}
          />

          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'} <IoLogInOutline />
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Switch to {isLoginMode ? 'Signup' : 'Login'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;

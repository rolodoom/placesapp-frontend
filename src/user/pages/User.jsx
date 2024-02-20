import { useEffect, useState } from 'react';
import UsersList from '../components/UsersList.jsx';

import ErrorModal from '../../shared/components/UIElements/ErrorModal.jsx';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.jsx';

import { useHttpClient } from '../../shared/hooks/http-hook.jsx';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API_URL}users`
        );
        setLoadedUsers(responseData.users);
      } catch (err) {
        //
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </>
  );
};

export default Users;

// ////////////////////////////////////////////////////////
// CODE USING ONLY FETCH
// ////////////////////////////////////////////////////////
//
// import React, { useEffect, useState } from 'react';
// import UsersList from '../components/UsersList';

// import ErrorModal from '../../shared/components/UIElements/ErrorModal';
// import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

// const Users = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState();
//   const [loadedUsers, setLoadedUsers] = useState();

//   useEffect(() => {
//     const sendRequest = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BACKEND_API_URL}users`
//         );
//         const responseData = await response.json();

//         if (!response.ok) {
//           throw new Error(responseData.message);
//         }

//         setLoadedUsers(responseData.users);
//       } catch (err) {
//         setError(err.message);
//       }
//       setIsLoading(false);
//     };
//     sendRequest();
//   }, []);

//   const errroHandler = () => {
//     setError(null);
//   };

//   return (
//     <>
//       <ErrorModal error={error} onError={errroHandler} />
//       {isLoading && (
//         <div className="center">
//           <LoadingSpinner />
//         </div>
//       )}

//       {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
//     </>
//   );
// };

// export default Users;

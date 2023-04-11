import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}users`
        );
        setLoadedUsers(responseData.users);
      } catch (err) {
        //
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
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
//           `${process.env.REACT_APP_BACKEND_API_URL}users`
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
//     <React.Fragment>
//       <ErrorModal error={error} onError={errroHandler} />
//       {isLoading && (
//         <div className="center">
//           <LoadingSpinner />
//         </div>
//       )}

//       {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
//     </React.Fragment>
//   );
// };

// export default Users;

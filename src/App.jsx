import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

// import './App.css';

const Auth = lazy(() => import('./user/pages/Auth.jsx'));
const NewPlace = lazy(() => import('./places/pages/NewPlace.jsx'));
const UserPlaces = lazy(() => import('./places/pages/UserPlaces.jsx'));
const UpdatePlace = lazy(() => import('./places/pages/UpdatePlace.jsx'));

import Users from './user/pages/User.jsx';
import MainNavigation from './shared/components/Navigation/MainNavigation.jsx';
import { AuthContext } from './shared/context/auth-context.jsx';
import { useAuth } from './shared/hooks/auth-hook.jsx';

import LoadingSpinner from './shared/components/UIElements/LoadingSpinner.jsx';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/*" element={<Navigate to="/auth" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner asOverlay />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

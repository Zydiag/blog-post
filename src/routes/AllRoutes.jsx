import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import {
  Home,
  Login,
  Register,
  BlogPage,
  CreatePage,
  VerifyEmail,
} from '../pages';
import { useAuth } from '../contexts/AuthContext';
export const AllRoutes = () => {
  const { currentUser } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/create"
        element={currentUser?.emailVerified ? <CreatePage /> : <Login />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
  );
};

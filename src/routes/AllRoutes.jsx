import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { Home, Login, Register, BlogPage, CreatePage } from '../pages';
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
  );
};

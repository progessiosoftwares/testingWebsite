import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Header';
import VideoLink from '../pages/VideoLink';
import Rodape from '../components/Rodape';
import Login from '../pages/Login';
import Admin from '../pages/Admin';
import Private from './private';

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:title/:id/page/:page" element={<VideoLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Private><Admin /></Private>} />
        <Route path="/page/:page" element={<Home />} />
      </Routes>
      <Rodape />
    </>
  );
}

export default AppRoutes;

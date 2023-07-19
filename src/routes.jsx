import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import VideoLink from './pages/VideoLink';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoLink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
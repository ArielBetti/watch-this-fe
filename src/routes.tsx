import { Routes, Route } from "react-router-dom";

// pages
import { Home, Login } from './pages';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
  </Routes>
);

export default AppRouter;

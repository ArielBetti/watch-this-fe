import { Routes, Route } from "react-router-dom";

// pages
import { Home, Login, SignIn } from './pages';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/signin" element={<SignIn />} />
  </Routes>
);

export default AppRouter;

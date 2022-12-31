import { Routes, Route } from "react-router-dom";

// pages
import { Home, Login, SignUp } from './pages';
import { PATHS } from "./core/paths";

const AppRouter = () => (
  <Routes>
    <Route path={PATHS.login} element={<Login />} />
    <Route path={PATHS.home} element={<Home />} />
    <Route path={PATHS.signOut} element={<SignUp />} />
  </Routes>
);

export default AppRouter;

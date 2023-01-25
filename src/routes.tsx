import { Routes, Route, Navigate } from 'react-router-dom';

// pages
import { CreateList, EditList, Home, List, Login, Logout, SignUp } from './pages';
import { PATHS } from './core/paths';

const AppRouter = () => (
  <Routes>
    <Route path={PATHS.createList} element={<CreateList />} />
    <Route path={PATHS.login} element={<Login />} />
    <Route path={PATHS.home} element={<Home />} />
    <Route path={PATHS.signup} element={<SignUp />} />
    <Route path={PATHS.logout} element={<Logout />} />
    <Route path={PATHS.editList}>
      <Route index element={<Navigate to={PATHS.home} replace />} />
      <Route path=":id" element={<EditList />} />
    </Route>
    <Route path={PATHS.list} element={<List />}>
      <Route path=":id" />
    </Route>
  </Routes>
);

export default AppRouter;

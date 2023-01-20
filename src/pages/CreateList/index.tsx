import { Navigate, useLocation } from 'react-router-dom';
import ContainerList from '../../container/List';
import { useUser } from '../../stores';

const CreateList = () => {
  const user = useUser();
  const location = useLocation()

  if (!user) {
    return <Navigate to="/" replace state={{from: location}} />;
  }

  return <ContainerList type="create" />;
};

export default CreateList;

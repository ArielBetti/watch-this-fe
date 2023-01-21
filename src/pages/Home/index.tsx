// components
import { CardList, CreateListButton, InlineLoading, Tapume } from '../../components';

// types
import { TCardListHandleRemoveListProps } from '../../components/Molecules/CardList/types';

// hooks
import { usePushNotification } from '../../hooks/usePushNotification';

// queries
import { useDeleteUserList, useUserListsQuery } from '../../queries';

// ::
const Home = () => {
  const userLists = useUserListsQuery();
  const pushNotification = usePushNotification();

  // queties & mutations
  const removeList = useDeleteUserList();
  const removeListById = ({ id, title }: TCardListHandleRemoveListProps) => {
    removeList.mutate(
      { id: id },
      {
        onSuccess: () => {
          pushNotification({
            title: `Lista "${title}" removida com sucesso`,
            message: '',
          });
        },
        onError: () =>
          pushNotification({
            title: `Erro!`,
            message: 'Ocorreu um erro ao tentar remover a lista.',
          }),
      }
    );
  };

  const handleRetryUserList = () => {
    userLists.refetch();
  };

  return (
    <div className="container mx-auto px-4">
      <CreateListButton />
      <div className="py-5">
        <InlineLoading text="Carregando suas listas..." isLoading={userLists.isLoading} />
      </div>
      <Tapume
        open={userLists.isError}
        title="Ops!"
        type="error"
        description="Ocorreu um erro."
        handleButtonClick={() => handleRetryUserList()}
      />
      <Tapume
        open={userLists.data?.length === 0}
        title="Você não possui listas"
        description="Crie uma nova para visualizar!"
        type="empty"
      />
      <div className="flex flex-wrap gap-5">
        {userLists?.data?.map((list) => (
          <CardList handleRemoveList={removeListById} key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Home;

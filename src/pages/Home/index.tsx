// components
import {
  CardList,
  CreateListButton,
  InlineLoading,
  Tapume,
} from "../../components";

// queries
import { useUserListsQuery } from "../../queries";

// ::
const Home = () => {
  const userLists = useUserListsQuery();

  const handleRetryUserList = () => {
    userLists.refetch();
  };

  return (
    <div className="container mx-auto px-4">
      <CreateListButton />
      <div className="py-5">
        <InlineLoading
          text="Carregando suas listas..."
          isLoading={userLists.isLoading}
        />
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
          <CardList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default Home;

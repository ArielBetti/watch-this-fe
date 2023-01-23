import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getList } from '../services';
import { TEndpointUserLists } from '../interfaces';
import { AxiosError } from 'axios';

type TUseGetListQueryProps = {
  id?: string;
  onSuccess?: (data: TEndpointUserLists) => void;
  onError?: (error: AxiosError<unknown>) => void;
};

export const useGetListQuery = ({ id, onSuccess, onError }: TUseGetListQueryProps) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['list', id],
    queryFn: () => getList(`${id}`),
    onSuccess,
    onError,
    enabled: !!id,
    staleTime: 1000 * 60 * 3, // 3 min
    initialData: () =>
      queryClient
        .getQueryData<TEndpointUserLists[]>(['user_lists'])
        ?.find((list) => list.id === id),
    initialDataUpdatedAt: () => queryClient.getQueryState(['user_lists'])?.dataUpdatedAt,
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TEndpointUserLists } from '../interfaces';
import { deleteUserList } from '../services';
import { useToken } from '../stores';

export const useDeleteUserList = () => {
  const queryClient = useQueryClient();
  const token = useToken();

  // Queries
  return useMutation({
    mutationFn: (body: { id: string }) => deleteUserList(token, body),
    // When mutate is called:
    onMutate: async (newList) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['user_lists'] });

      // Snapshot the previous value
      const previusList = queryClient.getQueryData<TEndpointUserLists[]>(['user_lists']);

      // Optimistically update to the new value
      const newValue = previusList?.filter((item) => item.id !== newList.id);

      queryClient.setQueryData(['user_lists'], newValue);

      // Return a context object with the snapshotted value
      return { previusList };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newList, context) => {
      queryClient.setQueryData(['user_lists'], context?.previusList);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user_lists'] });
    },
  });
};

import { services } from '@app/services/service';
import { QueryKeys } from '@app/utilities/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

const useComment = () => {
  const queryClient = useQueryClient();

  const { mutate: createComment } = useMutation({
    mutationFn: services.commentService.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.inProgressOrders] });
    },
    onError: error => Alert.alert('Error creating comment', error.message),
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: services.commentService.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.inProgressOrders] });
    },
    onError: error => Alert.alert('Error deleting comment', error.message),
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: services.commentService.updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.inProgressOrders] });
    },
    onError: error => Alert.alert('Error editing comment', error.message),
  });

  const { mutate: addReaction } = useMutation({
    mutationFn: services.commentService.addReaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.inProgressOrders] });
    },
    onError: error => Alert.alert('Error adding reaction', error.message),
  });

  return {
    createComment,
    updateComment,
    deleteComment,
    addReaction,
  };
};

export default useComment;

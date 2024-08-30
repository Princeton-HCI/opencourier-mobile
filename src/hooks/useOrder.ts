import { services } from '@app/services/service';
import { QueryKeys } from '@app/utilities/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';

const useOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: confirmOrderItems } = useMutation({
    mutationFn: services.orderService.confirmItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.inProgressOrders] });
    },
    onError: error => Alert.alert('Error confirming items', error.message),
  });

  return {
    confirmOrderItems,
  };
};

export default useOrder;

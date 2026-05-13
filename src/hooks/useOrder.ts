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

  const { mutate: arrivedAtPickup, isPending: isArrivedAtPickupPending } =
    useMutation({
      mutationFn: services.orderService.arrivedAtPickup,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.inProgressOrders],
        });
      },
      onError: error =>
        Alert.alert('Error marking arrived at pickup', error.message),
    });

  const { mutate: arrivedAtDropoff, isPending: isArrivedAtDropoffPending } =
    useMutation({
      mutationFn: services.orderService.arrivedAtDropoff,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.inProgressOrders],
        });
      },
      onError: error =>
        Alert.alert('Error marking arrived at dropoff', error.message),
    });

  return {
    confirmOrderItems,
    arrivedAtPickup,
    isArrivedAtPickupPending,
    arrivedAtDropoff,
    isArrivedAtDropoffPending,
  };
};

export default useOrder;

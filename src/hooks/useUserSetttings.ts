import { services } from '@app/services/service';
import { QueryKeys } from '@app/utilities/queryKeys';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Alert } from 'react-native';

const useUserSettings = () => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: services.userService.getUserSettings,
    queryKey: [QueryKeys.userSettings],
  });

  const { mutate, isPaused } = useMutation({
    mutationFn: services.userService.updateUserSettings,
    onSuccess: () => refetch(),
    onError: error => Alert.alert('Api Error', error.message),
  });

  return {
    settings: data,
    isLoading,
    isUpdating: isPaused,
    updateSettings: mutate,
  };
};

export default useUserSettings;

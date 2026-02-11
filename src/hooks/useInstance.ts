import { services } from '@app/services/service';
import { Organization } from '@app/types/types';
import { QueryKeys } from '@app/utilities/queryKeys';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch and manage instance metadata
 * @param instanceLink - Optional specific instance link to fetch metadata for
 * @param enabled - Whether the query should run automatically (default: true)
 */
export const useInstance = (instanceLink?: string, enabled: boolean = true) => {
  // Fetch specific instance metadata if instanceLink is provided
  const {
    data: instance,
    isLoading: isLoadingInstance,
    error: instanceError,
    refetch: refetchInstance,
  } = useQuery<Organization | null>({
    queryFn: () =>
      instanceLink
        ? services.instanceService.getInstanceMetadata(instanceLink)
        : Promise.resolve(null),
    queryKey: [QueryKeys.instance, instanceLink],
    enabled: enabled && !!instanceLink,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch all user instances
  const {
    data: userInstances,
    isLoading: isLoadingInstances,
    error: instancesError,
    refetch: refetchInstances,
  } = useQuery<Organization[]>({
    queryFn: services.instanceService.getUserInstances,
    queryKey: [QueryKeys.userInstances],
    enabled: enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    // Single instance data
    instance,
    isLoadingInstance,
    instanceError,
    refetchInstance,

    // User instances data
    userInstances: userInstances || [],
    isLoadingInstances,
    instancesError,
    refetchInstances,
  };
};

export default useInstance;

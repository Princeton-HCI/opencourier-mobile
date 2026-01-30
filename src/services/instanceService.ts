import { Organization } from '@app/types/types';
import { UClient } from './Client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface InstanceMetadata {
  name: string;
  imageUrl?: string;
  userCount?: number;
  link: string;
}

export interface InstanceService {
  getInstanceMetadata: (instanceLink: string) => Promise<Organization>;
  getUserInstances: () => Promise<Organization[]>;
}

const instanceService = (client: UClient): InstanceService => {
  /**
   * Ensures the client has the correct baseURL loaded from storage
   */
  const ensureBaseUrl = async () => {
    if (!client.defaults.baseURL) {
      const baseUrl = await AsyncStorage.getItem('BASE_URL');
      if (baseUrl) {
        client.defaults.baseURL = baseUrl;
      }
    }
  };
  /**
   * Fetches metadata from an instance and converts it to Organization format
   * @param instanceLink - The full URL of the instance (e.g., "https://instance.example.com")
   * @returns Promise<Organization>
   */
  const getInstanceMetadata = async (
    instanceLink: string,
  ): Promise<Organization> => {
    try {
      const sanitizedLink = instanceLink.trim().replace(/\/$/, '');
      const { data } = await client.get(`${sanitizedLink}/metadata`);

      // Metadata is nested under result.details
      const metadata = data.result.details;

      // Convert instance metadata to Organization format
      return {
        id: sanitizedLink, // Use the instance link as unique ID
        name: metadata.name || 'Unknown Instance',
        imageUrl: metadata.imageUrl || '',
      };
    } catch (error) {
      console.error('Error fetching instance metadata:', error);
      throw new Error(`Failed to fetch metadata from ${instanceLink}`);
    }
  };

  /**
   * Gets all instances the user has access to
   * Currently returns the user's current instance from the BASE_URL
   * @returns Promise<Organization[]>
   */
  const getUserInstances = async (): Promise<Organization[]> => {
    try {
      // Ensure the client has the correct baseURL before making requests
      await ensureBaseUrl();

      console.log('Fetching user instances...');
      console.log('Base URL:', client.defaults.baseURL);

      // Get the instance URL from BASE_URL (format: {instance_url}/api/courier/v1)
      const baseUrl = client.defaults.baseURL;
      if (!baseUrl) {
        console.warn('No BASE_URL set');
        return [];
      }

      // Extract the instance URL by removing /api/courier/v1
      const instanceUrl = baseUrl.replace(/\/api\/courier\/v1\/?$/, '');
      console.log('Instance URL:', instanceUrl);

      // Fetch metadata for the user's instance
      const organization = await getInstanceMetadata(instanceUrl);
      console.log('Fetched organization:', organization);
      return [organization];
    } catch (error) {
      console.error('Error fetching user instances:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      return [];
    }
  };

  return {
    getInstanceMetadata,
    getUserInstances,
  };
};

export default instanceService;

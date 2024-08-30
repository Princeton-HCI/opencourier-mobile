import { UClient } from './Client';
import { OrderServiceParams, OrderServiceReponse } from './types';

export interface OrderService {
  getNewOrders: () => Promise<OrderServiceReponse>;
  getInProgressOrders: () => Promise<OrderServiceReponse>;
  getOrdersHistory: () => Promise<OrderServiceReponse>;
  acceptOrder: (id: string) => Promise<OrderServiceReponse>;
  declineOrder: (id: string) => Promise<OrderServiceReponse>;
  confirmItems: (params: {
    id: string;
    isDispatched: boolean;
  }) => Promise<OrderServiceReponse>;
  markAsDelivered: (params: {
    id: string;
    note: string;
  }) => Promise<OrderServiceReponse>;
}

const orderService = (client: UClient): OrderService => {
  const getNewOrders = async (): Promise<OrderServiceReponse> => {
    const { data } = await client.get('deliveries/new?page=1&perPage=10');
    return data.result.data;
  };

  const getInProgressOrders = async (): Promise<OrderServiceReponse> => {
    const { data } = await client.get(
      'deliveries/in-progress?page=0&perPage=10',
    );
    return data.result.data;
  };

  const getOrdersHistory = async (): Promise<OrderServiceReponse> => {
    const { data } = await client.get('deliveries/done?page=0&perPage=50');
    return data.result.data;
  };

  const acceptOrder = async (id: string): Promise<OrderServiceReponse> => {
    await client.post(`deliveries/${id}/accept`, {});
    return client.post(`deliveries/${id}/mark-as-dispatched`, {});
  };

  const declineOrder = async (id: string): Promise<OrderServiceReponse> => {
    return client.post(`deliveries/${id}/reject`, {});
  };

  const confirmItems = async (params: {
    id: string;
    isDispatched: boolean;
  }): Promise<OrderServiceReponse> => {
    const { id, isDispatched } = params;
    if (!isDispatched) {
      await client.post(`deliveries/${id}/mark-as-dispatched`, {});
    }
    return client.post(`deliveries/${id}/mark-as-picked-up`);
  };

  const markAsDelivered = async (params: {
    id: string;
    note: string;
  }): Promise<OrderServiceReponse> => {
    const { id, note } = params;
    return client.post(`deliveries/${id}/mark-as-delivered`, {
      note: note,
      imageName: 'imageName',
      imageType: 'JPEG',
    });
  };

  return {
    getNewOrders,
    getOrdersHistory,
    getInProgressOrders,
    acceptOrder,
    confirmItems,
    markAsDelivered,
    declineOrder,
  };
};

export default orderService;

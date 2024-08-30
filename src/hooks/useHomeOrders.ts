import { Order, UserStatus } from '@app/types/types';
import { services } from '@app/services/service';
import { useEffect, useState } from 'react';
import { AUTO_ACCEPT_DECLINE_TIMER } from '@app/utilities/constants';
import { OrderSetting } from '@app/types/enums';
import { Alert } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@app/utilities/queryKeys';
import useUser from './useUser';

class Timer {
  started: Date;
  callback: () => void;
  delay: number;
  id: NodeJS.Timeout;

  constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.delay = delay;
    this.started = new Date();
    this.id = setTimeout(this.callback, this.delay);
  }

  stop() {
    clearTimeout(this.id);
  }

  getTimeLeftMilli() {
    return this.started ? this.started.valueOf() + this.delay - Date.now() : 0;
  }
}

export const useHomeOrders = () => {
  const [dataSourceNew, setDataSourceNew] = useState<Order[]>([]);
  const [dataSourceInProgress, setDataSourceInProgress] = useState<Order[]>([]);
  const [dataSourceHistory, setDataSourceHistory] = useState<Order[]>([]);
  const [offerExpirationTimers, setOfferExpirationTimers] = useState<
    Map<string, Timer>
  >(new Map());

  // quieries

  const {
    data: newOrders,
    isLoading: loadingNewOrders,
    refetch: refetchNew,
  } = useQuery({
    queryFn: services.orderService.getNewOrders,
    queryKey: [QueryKeys.newOrders],
  });

  const {
    data: inProgressOrders,
    isLoading: loadingInProgressOrders,
    refetch: refetchInProgress,
  } = useQuery({
    queryFn: services.orderService.getInProgressOrders,
    queryKey: [QueryKeys.inProgressOrders],
  });

  const {
    data: historyOrders,
    isLoading: loadingHistoryOrders,
    refetch: refechHistory,
  } = useQuery({
    queryFn: services.orderService.getOrdersHistory,
    queryKey: [QueryKeys.orderHistory],
  });

  // mutations

  const { mutate: acceptOrder } = useMutation({
    mutationFn: services.orderService.acceptOrder,
    onSuccess: () => {
      refetchNew();
      refetchInProgress();
    },
    onError: error => Alert.alert('Error accepting order', error.message),
  });

  const { mutate: declineOrder } = useMutation({
    mutationFn: services.orderService.declineOrder,
    onSuccess: () => {
      refetchNew();
    },
    onError: error => Alert.alert('Error declining order', error.message),
  });

  //Temp fix
  const [upDownVotedNoteIds, setUpDownVotedNoteIds] = useState<string[][]>([
    [],
    [],
  ]);

  const { user } = useUser();

  const acceptOrderFn = (orderId: string) => {
    offerExpirationTimers.get(orderId)?.stop();
    offerExpirationTimers.delete(orderId);

    acceptOrder(orderId);

    const updateNewOrders = newOrders!.filter(
      newOrder => newOrder.id !== orderId,
    );
    setDataSourceNew(updateNewOrders);
  };

  const declineOrderFn = (orderId: string) => {
    offerExpirationTimers.get(orderId)?.stop();
    offerExpirationTimers.delete(orderId);

    declineOrder(orderId);

    const updateNewOrders = newOrders!.filter(item => item.id !== orderId);
    setDataSourceNew(updateNewOrders);
  };

  useEffect(() => {
    if (newOrders !== undefined) {
      const newOfferExpirationTimers = new Map(offerExpirationTimers);
      newOrders.forEach(order =>
        newOfferExpirationTimers.set(
          order.id,
          new Timer(
            () =>
              user!.deliverySetting === OrderSetting.auto_accept
                ? acceptOrderFn(order.id)
                : declineOrderFn(order.id),
            AUTO_ACCEPT_DECLINE_TIMER,
          ),
        ),
      );
      setOfferExpirationTimers(newOfferExpirationTimers);
      setDataSourceNew(newOrders);
    }
  }, [newOrders]);

  useEffect(() => {
    if (inProgressOrders) {
      setDataSourceInProgress(inProgressOrders);
    }
  }, [inProgressOrders]);

  useEffect(() => {
    if (historyOrders) {
      setDataSourceHistory(historyOrders);
    }
  }, [historyOrders]);

  useEffect(() => {
    if (user?.status === UserStatus.Online) {
      refetchNew();
    }
  }, [user?.status]);

  const upvoteCommentTemp = (noteId: string) => {
    if (!upDownVotedNoteIds[0].includes(noteId)) {
      setUpDownVotedNoteIds([
        [...upDownVotedNoteIds[0], noteId],
        upDownVotedNoteIds[1].filter(e => e != noteId),
      ]);
    }
  };

  const downvoteCommentTemp = (noteId: string) => {
    if (!upDownVotedNoteIds[1].includes(noteId)) {
      setUpDownVotedNoteIds([
        upDownVotedNoteIds[0].filter(e => e != noteId),
        [...upDownVotedNoteIds[1], noteId],
      ]);
    }
  };

  return {
    dataSourceNew,
    dataSourceHistory,
    dataSourceInProgress,
    offerExpirationTimers,
    setOfferExpirationTimers,
    acceptOrderFn,
    declineOrderFn,
    //Temp fix
    upDownVotedNoteIds,
    upvoteCommentTemp,
    downvoteCommentTemp,
    isLoading:
      loadingNewOrders || loadingInProgressOrders || loadingHistoryOrders,
    refetchNew,
    refetchInProgress,
    refechHistory,
  };
};

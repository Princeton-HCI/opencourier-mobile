/* eslint-disable react-hooks/exhaustive-deps */
import useUser from '@app/hooks/useUser';
import { QueryKeys } from '@app/utilities/queryKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const ClientSocket = (url: string, token: String) => {
  const socket = io(url, {
    transports: ['websocket'],
    auth: { authorization: `Bearer ${token}` },
  });

  return socket;
};

const SocketProvider = () => {
  const queryClient = useQueryClient();

  const [url, setUrl] = useState<string>();
  const [token, setToken] = useState<string>();

  const { user } = useUser();

  useEffect(() => {
    if (user && !token) {
      checkForToken();
    }
  }, [user, url]);

  useEffect(() => {
    let socket: Socket;
    if (url && token) {
      socket = ClientSocket(url, token);

      socket.on('NEW_DELIVERY_OFFER', _data => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.newOrders] });
      });

      socket.on('connect', () => {
        // console.warn('connect');
      });

      socket.on('disconnect', _any => {
        // console.warn('disconnect'); // undefined
      });

      socket.on('connect_error', _err => {
        // console.warn('connect_error', err);
        // client.connect();
      });
    }

    return () => {
      if (socket) {
        socket.removeAllListeners();
      }
    };
  }, [url, token]);

  const checkForToken = async () => {
    const savedToken = await AsyncStorage.getItem('token');
    const baseUrl = await AsyncStorage.getItem('SOCKET_BASE_URL');
    if (savedToken && baseUrl) {
      setUrl(baseUrl);
      setToken(savedToken);
    }
  };

  return null;
};

export default SocketProvider;

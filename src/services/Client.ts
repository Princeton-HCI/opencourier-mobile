import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
//@ts-ignore

export interface UClient extends AxiosInstance {}

const timeout = 10000;

const Client = (): UClient => {
  const options: AxiosRequestConfig = {
    timeout: timeout,
    headers: {
      Accept: 'application/json',
    },
  };

  const addInterseptor = (axiosClient: UClient) => {
    axiosClient.interceptors.request.use(config => {
      return new Promise(async resolve => {
        if (!config.headers.Authorization) {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        resolve(config);
      });
    });
  };

  // const refreshToken = async (): Promise<string> => {
  //   // pull token
  //   // return token;
  //   return '';
  // };

  //   const refreshInterceptor = axiosClient.interceptors.response.use(
  //     response => response,
  //     error => {
  //       if (
  //         error.response &&
  //         error.response.data &&
  //         error.response.data.statusCode
  //       ) {
  //         const status = error.response.data.statusCode;
  //         // Reject promise if usual error
  //         if (status !== 401) {
  //           return Promise.reject(error);
  //         }
  //       } else {
  //         return Promise.reject(error);
  //       }

  //       /*
  //        * When response code is 401, try to refresh the token.
  //        * Eject the interceptor so it doesn't loop in case
  //        * token refresh causes the 401 response
  //        */
  //       axiosClient.interceptors.response.eject(refreshInterceptor);

  //       return refreshToken()
  //         .then(token => {
  //           error.response.config.headers.Authorization = `Bearer ${token}`;
  //           return axiosClient(error.response.config);
  //         })
  //         .catch(_refreshError => {
  //           return Promise.reject(error);
  //         })
  //         .finally(() => addInterseptor(axiosClient));
  //     },
  //   );
  // };

  const Axios = axios.create(options);

  addInterseptor(Axios);

  return Axios;
};

export const client = Client();

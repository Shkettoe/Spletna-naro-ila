import { AxiosInstance, AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const useApi = <T>() => {
  const response = ref<AxiosResponse<T>>();
  const error = ref<string>('');
  const loading = ref<boolean>(true);
  const noConn = ref<boolean>(false);

  const apiFetch = async ({
    apiInstance = api,
    method,
    url,
    data,
  }: {
    apiInstance?: AxiosInstance;
    method: string;
    url: string;
    data?: object;
  }) => {
    try {
      response.value = await apiInstance(url, {
        method,
        data,
      });
    } catch (err: any) {
      error.value = err.message;
      console.log(err)
      if(err.name === 'AxiosError' && err.message === 'Network Error') {
        noConn.value = true;
        error.value = 'No connection to the server'
      }
    }
    loading.value = false;
  };

  return [response, error, apiFetch, loading, noConn] as const;
};

export default useApi;

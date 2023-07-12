import React from "react";
import { AxiosRequestConfig } from "axios";
import $api from "@http/api";
import { RequestType } from "@http/interfaces";

interface RequestHookProps {
  url: string;
  type?: RequestType;
  body?: any;
  timeout?: number;
}

interface RequestState<T> {
  isLoading: boolean;
  error: any;
  data: T | null;
}

const useRequest = <T>({
  url, type = RequestType.get, body = null, timeout = 0
}: RequestHookProps
): RequestState<T> => {

  const [state, setState] = React.useState<RequestState<T>>
    ({ isLoading: false, error: null, data: null });

  const get = (config: AxiosRequestConfig) => {
    return $api.get<T>(url, config);
  }

  const post = (config: AxiosRequestConfig) => {
    return $api.post<T>(url, body, config);
  }

  React.useEffect(() => {

    const abortController = new AbortController();

    const config: AxiosRequestConfig = {
      signal: abortController.signal,
      timeout
    };

    (async () => {
      setState({ isLoading: true, error: null, data: null });

      try {
        const method = type === RequestType.get ? get : post;

        const response = await method(config);
        const { data } = response;

        setState(prev => ({ ...prev, error: null, data }));
      } catch (error) {
        console.error(error);
        setState(prev => ({ ...prev, error, data: null }));
      } finally {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    })();

    return () => abortController.abort();

  }, [url, type, body]);

  return state;
}

export default useRequest;

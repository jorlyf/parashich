import { AxiosRequestConfig } from "axios";
import $api from "./api";
import { RequestType } from "./interfaces";

interface RequestProps {
  url: string;
  type?: RequestType;
  body?: any | null;
  timeout?: number;
  signal?: AbortSignal | null;
}

interface Response<T> {
  status: number;
  message: string | null;
  data: T | null;
}

const request = async <T>({
  url, type = RequestType.get, body = null, timeout = 0, signal = null
}: RequestProps
): Promise<Response<T>> => {

  const get = (config: AxiosRequestConfig) => {
    return $api.get<T>(url, config);
  }

  const post = (config: AxiosRequestConfig) => {
    return $api.post<T>(url, body, config);
  }

  const config: AxiosRequestConfig = {
    signal,
    timeout
  };

  const method = type === RequestType.get ? get : post;

  try {
    const response = await method(config);

    console.log(response);

    return {
      status: response.status,
      message: null,
      data: response.data
    }
  } catch (error) {
    console.log(error);

    return {
      status: error.status,
      message: null,
      data: null
    }
  }
}

export default request;

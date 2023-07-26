import { AxiosRequestConfig, AxiosResponse } from "axios";
import $api from "./api";
import { RequestType } from "./interfaces";
import { notification } from "antd";
import { t } from "i18next";

interface RequestProps {
  url: string;
  type?: RequestType;
  body?: any | null;
  timeout?: number;
  signal?: AbortSignal | null;
}

interface Response<T> {
  status: number;
  data: T | null;
}

const request = async <T>({
  url, type = RequestType.get, body = null, timeout = 0, signal = null
}: RequestProps
): Promise<Response<T>> => {

  const httpGet = (config: AxiosRequestConfig) => {
    return $api.get<T>(url, config);
  }

  const httpPost = (config: AxiosRequestConfig) => {
    return $api.post<T>(url, body, config);
  }

  const httpPut = (config: AxiosRequestConfig) => {
    return $api.put<T>(url, body, config);
  }

  const httpDelete = (config: AxiosRequestConfig) => {
    return $api.delete<T>(url, config);
  }

  const config: AxiosRequestConfig = {
    signal,
    timeout,
    validateStatus: (status) => status >= 200 && status < 400
  };

  let method: (config: AxiosRequestConfig) => Promise<AxiosResponse<T>> = null;

  switch (type) {
    case RequestType.get: {
      method = httpGet;
      break;
    }
    case RequestType.post: {
      method = httpPost;
      break;
    }
    case RequestType.put: {
      method = httpPut;
      break;
    }
    case RequestType.delete: {
      method = httpDelete;
      break;
    }
  }

  try {
    const response = await method(config);

    return {
      status: response.status,
      data: response.data
    }
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      notification.error({ message: t("Server is shutdown") });
    }

    if (error.status === 500) {
      notification.error({ message: t("Inner server exception has occured") })
    }

    throw error;
  }
}

export default request;

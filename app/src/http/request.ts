import { AxiosRequestConfig } from "axios";
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

    return {
      status: response.status,
      message: null,
      data: response.data
    }
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      notification.error({ message: t("Server is shutdown") });
    }

    return {
      status: error.response?.data?.status ?? null,
      message: error.response?.data?.message ?? null,
      data: null
    }
  }
}

export default request;

import React from "react";
import { MainLayout } from "@layouts/index";
import useRequest from "@hooks/useRequest";
import { RequestType } from "@http/interfaces";
import { Button } from "antd";
import request from "@http/request";

const HomePage: React.FC = () => {
  const r = useRequest<any>({
    url: "abcd",
    type: RequestType.get
  });

  const sendTestRequest = async () => {
    const response = await request(
      { url: "1234" });
    console.log(response);
  }

  console.log(r);

  return (
    <MainLayout>
      <Button onClick={sendTestRequest}>
        send test request
      </Button>
    </MainLayout>
  );
}

export default HomePage;

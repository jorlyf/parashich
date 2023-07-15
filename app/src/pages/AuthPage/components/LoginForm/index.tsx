import React from "react";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useStore } from "@hooks/index";
import useLoginForm from "./hooks/useLoginForm";
import styles from "./styles.module.scss";

const LoginForm: React.FC = observer(() => {

  const { authStore } = useStore();

  const {
    onSubmit,
    authMode,
    toggleAuthMode
  } = useLoginForm({ authStore });

  return (
    <Form
      className={styles.login_form}
      labelCol={{ span: 5 }}
      onFinish={onSubmit}
    >
      <h2>{authMode === "login" ? "Вход" : "Регистрация"}</h2>
      <Form.Item
        label={"Логин"}
        name={"login"}
        rules={[{ required: true, message: "Не менее 4 символов!", min: 4, max: 32 }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={"Пароль"}
        name={"password"}
        rules={[{ required: true, message: "Не менее 5 символов!", min: 5, max: 64 }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "24px" }}
        >
          {authMode === "login" ? "Войти" : "Зарегистрироваться"}
        </Button>
      </Form.Item>

      <Form.Item>
        <a onClick={toggleAuthMode}>
          {authMode === "login" ? "Я не зарегистрирован" : "У меня есть аккаунт"}
        </a>
      </Form.Item>
    </Form>
  );
});

export default LoginForm;

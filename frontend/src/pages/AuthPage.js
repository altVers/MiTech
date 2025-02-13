import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useContext, useState } from "react";
import { registration } from "../api/auth/registration";
import { login } from "../api/auth/login";
import { observer } from "mobx-react-lite";
import { userContext } from "..";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";

const AuthPage = observer(() => {
  const { user } = useContext(userContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const auth = async (e) => {
    try {
      e.preventDefault();
      let data = null;
      if (!isLogin) {
        data = await registration(email, password);
      } else {
        data = await login(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 56 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-4"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Form.Control
            className="mt-4"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            type="submit"
            variant="outline-success"
            className="mt-4"
            onClick={auth}
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
          <Button
            variant="link"
            onClick={() => setIsLogin((prev) => !prev)}
            className="mt-2"
          >
            {!isLogin
              ? "У меня есть аккунт, войти"
              : "У меня нет аккаунта, зарегистрироваться"}
          </Button>
        </Form>
      </Card>
    </Container>
  );
});

export default AuthPage;

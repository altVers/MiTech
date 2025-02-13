import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, AUTH_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { userContext } from "../..";
import { useContext } from "react";

const logoStyles = {
  fontSize: "24px",
  color: "white",
  textDecoration: "none",
  height: 40,
};

export const NavigationBar = observer(() => {
  const { user } = useContext(userContext);
  const navigate = useNavigate()

  const logout = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          gap: 30,
          justifyContent: "space-between",
        }}
      >
        <NavLink to={SHOP_ROUTE} style={logoStyles}>
          MiTech
        </NavLink>
        <Nav>
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <div style={{ display: "flex", gap: 10 }}>
          {user.isAuth ? (
            <>
              <Button variant="light" onClick={() => navigate(ADMIN_ROUTE)}>Панель управления</Button>
              <Button variant="secondary" onClick={() => logout()}>Выйти</Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => navigate(AUTH_ROUTE)}>
              Войти
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
});

// export default NavigationBar;

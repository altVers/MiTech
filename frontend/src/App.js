import { BrowserRouter } from "react-router-dom";
import AppRouter from "./app/AppRouter";
import Header from "./components/Header/Header";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { userContext } from ".";
import { check } from "./api/auth/check";
import Spinner from "react-bootstrap/Spinner";

const App = observer(() => {
  const { user } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch((error) => {})
      .finally(() => setIsLoading(false));
  }, [user]);

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </Spinner>
    );

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;

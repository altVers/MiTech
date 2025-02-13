import AdminPage from "../pages/AdminPage";
import BasketPage from "../pages/BasketPage";
import ShopPage from "../pages/ShopPage";
import AuthPage from "../pages/AuthPage";
import DevicePage from "../pages/DevicePage";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  AUTH_ROUTE,
  SHOP_ROUTE,
} from "../utils/consts";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: <AdminPage />,
  },
  {
    path: BASKET_ROUTE,
    Component: <BasketPage />,
  },
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: <ShopPage />,
  },
  {
    path: AUTH_ROUTE,
    Component: <AuthPage />,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: <DevicePage />,
  },
];

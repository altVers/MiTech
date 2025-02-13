import { $authHost } from "..";
import { jwtDecode } from "jwt-decode";

export const check = async () => {
  const { data } = await $authHost.get(`api/user/auth`);
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

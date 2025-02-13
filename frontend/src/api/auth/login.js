import { $host } from "..";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
  const { data } = await $host.post(`api/user/login`, { email, password });
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token);
};

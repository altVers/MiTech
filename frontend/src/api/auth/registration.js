import { $host } from ".."
import { jwtDecode } from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post(`api/user/registration`, { email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}
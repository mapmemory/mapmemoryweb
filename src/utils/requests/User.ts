import axios from "axios";
import { route } from "./Enum";

export interface User {
  Guid: string;
  Name: string;
  Email: string;
  Password: string;
  CLass: string;
}

export async function getUserInfo(username: string) {
  return await axios.get<User>(`${route}/api/${username}`);
}

export async function updateUser(user: User) {
  return await axios.put<User>(`${route}/api/${user.Guid}/change`, user);
}

export async function registerUser (name: string, email: string, password: string) : Promise<{token: string, user: User}> {
  return axios
    .post(`${route}/api/User/register`, {
      name,
      email,
      password,
    })
    .then((response) => {
      return { token: response.data.token, user: response.data.newUser };
    });
}

export async function login (email: string, password: string) : Promise<{ token: string, foundUser: User }> {
  return axios
    .post(`${route}/api/User/login`, {
      email,
      password,
    })
    .then((response) => {
      return { token: response.data.token, foundUser: response.data.foundUser };
    });
}

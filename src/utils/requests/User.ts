import axios from "axios";
import { route } from "./api";
import { api, axiosConfigJSON } from "./api";

export interface User {
  id: number;
  guid: string;
  name: string;
  email: string;
  password: string;
  class: number;
}

export interface IUserLogged {
  token: string;
  id: number;
  guid: string;
  name: string;
  email: string;
  class: number;
}

export interface IUserToUpdate {
  email: string;
  oldPassword: string;
  newPassword: string;
  name: string;
  class: number;
}

export interface IUserToRegister {
  name: string;
  email: string;
  password: string;
  class: number;
}

export async function getUserInfo(username: string) {
  return await axios.get<User>(`${route}/${username}`);
}

export async function registerUser(user: IUserToRegister) : Promise<{token: string, user: User}> {
  return await axios
    .post(`${route}/User/register`, user, axiosConfigJSON)
    .then((response) => {
      return { token: response.data.token, user: response.data.newUser };
    })
    .catch((error) => {
      throw new Error(`[${error}]\nOcorreu um erro na requisição`);
    });
}

export async function login(email: string, password: string): Promise<{ token: string, foundUser: User }> {
  return api
    .post(`${route}/User/login`, {
      email,
      password,
    })
    .then((response) => {
      return { token: response.data.token, foundUser: response.data.foundUser };
    })
    .catch((error) => {
      throw new Error(`[${error}]\nOcorreu um erro na requisição.`);
    });
}

export async function updateUser(
  uuidChange: string, user: IUserToUpdate
): Promise<{ token: string, foundUser: User }> {
  return await api
    .put(`${route}/User/${uuidChange}/change`, user)
    .then(async () => {
      return await login(user.email, user.newPassword);
    })
    .catch((error) => {
      throw new Error(`[${error}]\nOcorreu um erro ao atualizar o usuário.`);
    });
}

export async function deleteUser(uuid: string): Promise<boolean> {
  return await api
    .delete(`${route}/User/${uuid}`)
    .then((response) => {
      if (response.status === 204) return true;
      else throw new Error(`Ocorreu um erro ao remover o usuário.`);
    })
    .catch((error) => {
      throw new Error(`[${error}]\nOcorreu um erro ao remover o usuário.`);
    });
}

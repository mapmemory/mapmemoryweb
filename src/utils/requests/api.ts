import axios from "axios";

export const axiosConfigJSON = {
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
}

export const axiosConfigFileForm = {
  "headers": {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*"
  }
}

export function getFromLocalStorage(keyLocalStorage: string = "token") {
  if (typeof window === "undefined") {
    return null;
  }
  return JSON.parse(localStorage.getItem(keyLocalStorage) as string);
}

export function putInLocalStorage(dataLocalStorage: { 
    token: string, guid: string, name: string, email: string, class: string
  }): void | null {
  if (typeof window === "undefined") return null;

  localStorage.setItem("token", JSON.stringify(dataLocalStorage));
}

export function removeFromLocalStorage(keyLocalStorage: string = "token") {
  if (typeof window === "undefined") {
    return null;
  }
  localStorage.removeItem(keyLocalStorage);
}

const storage = getFromLocalStorage("token");
let token;
if (storage) {
  const token = storage.token;
}

export const api = axios.create({
  timeout: 256000,
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  }
});
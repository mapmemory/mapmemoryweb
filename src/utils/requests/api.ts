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

export function getFromLocalStorage(keyLocalStorage: string = "user"): string | null {
  if (typeof window === "undefined") {
    return null;
  }
  return localStorage.getItem(keyLocalStorage);
}

export function putInLocalStorage(dataLocalStorage: object): void | null {
  if (typeof window === "undefined") {
    return null;
  }
  localStorage.setItem("user", JSON.stringify(dataLocalStorage));
}

const storage = JSON.parse(getFromLocalStorage("token") as string);
const token = storage;
console.log(token);

export const api = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  }
});
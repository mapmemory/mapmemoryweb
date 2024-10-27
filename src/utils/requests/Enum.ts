import axios from "axios";
import { route } from "./api";

let spotTypes, classes;

export async function getSpotTypes() {
  return axios.get(`${route}/Enum/getSpotTypes`).then((response) => {
    spotTypes = response.data
  });
}

export async function getClasses() {
  return axios.get(`${route}/Enum/getClasses`).then((response) => {
    classes = response.data
  });
}
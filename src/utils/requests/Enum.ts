import axios from "axios";

let spotTypes, classes;

export let route = "https://luisdef.com/mapmemsrv/api";

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
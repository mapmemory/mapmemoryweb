import axios from "axios";

let spotTypes, classes;

export let route = "http://172.27.218.2/srv/api";

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
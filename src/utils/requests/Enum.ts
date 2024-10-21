import axios from "axios";

let spotTypes, classes;

export let route = 
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002/api"
    : "https://mapamemorias.herokuapp.com"

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
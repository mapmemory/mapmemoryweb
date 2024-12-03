import axios from "axios";
import { axiosConfigFileForm, axiosConfigJSON, route } from "./api";
import { api } from "./api";

export interface MapSpot {
  id: number;
  guid: string;
  description: string;
  type: number;
  name: string;
  latitude: number;
  longitude: number;
  picture : string;
}

export interface mapSpotToAdd {
  description: string;
  type: number;
  picture: string;
  latitude: number;
  longitude: number;
  userId: number;
}

export async function uploadPicture(picture: FormData) {
  return api.post(`${route}/Upload/uploadPicture`, picture, axiosConfigFileForm)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`[${error}]\nOcorreu um erro na requisição`);
    });
}

export async function getMapSpots() {
  return axios.get<MapSpot[]>(`${route}/MapSpot/getSpots`).then((response) => {
    if (response.data) return response.data;
    else return false;
  }).catch((error) => {
    throw new Error(error);
  });
}

export async function getMapSpotByGuid(guid: string) {
  return axios.get<MapSpot>(`${route}/MapSpot/${guid}`).then((response) => {
    return response.data;
  }).catch((error) => {
    throw new Error(error);
  });
}

export async function addMapSpot(spot: mapSpotToAdd) {
  return api.post(`${route}/MapSpot/addSpot`, spot, axiosConfigJSON)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(`[${error}]\nOcorreu um erro na requisição`);
    });
}

export async function updateMapSpot(spot: MapSpot) {
  return axios.put<MapSpot>(`${route}/MapSpot/updateSpot/${spot.guid}`, spot).then((response) => {
    return response.data;
  });
}

export async function deleteMapSpot(Guid: string) {
  return axios.delete<MapSpot>(`${route}/MapSpot/deleteSpot/${Guid}`).then((response) => {
    return response.data;
  });
}

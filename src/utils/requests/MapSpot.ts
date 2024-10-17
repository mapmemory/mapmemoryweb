import axios from "axios";
import {route} from "./Enum";

export interface MapSpot {
    Guid: string;
    Description: string;
    SpotType: string;
    Latitude: number;
    Longitude: number;
    picture : string;
}

export async function getMapSpots() {
    return axios.get<MapSpot[]>(`${route}/MapSpot/getSpots`).then((response) => {
        return response.data;
    });
}

export async function addMapSpot(spot: MapSpot) {
    return axios.post<MapSpot>(`${route}/MapSpot/addSpot`, spot).then((response) => {
        return response.data;
    });
}

export async function updateMapSpot(spot: MapSpot) {
    return axios.put<MapSpot>(`${route}/MapSpot/updateSpot/${spot.Guid}`, spot).then((response) => {
        return response.data;
    });
}

export async function deleteMapSpot(Guid : string) {
    return axios.delete<MapSpot>(`${route}/MapSpot/deleteSpot/${Guid}`).then((response) => {
        return response.data;
    });
}
import { getMapSpots, MapSpot } from "./requests/MapSpot";

export async function filterMemoriesByUser(userId: number) {
    const memories = await getMapSpots();
    return memories.filter((mapSpot: MapSpot) => mapSpot.id === userId);
}
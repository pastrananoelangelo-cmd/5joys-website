import { LOCATIONS } from "../../data/website/locations";

export function getLocations() {
  return LOCATIONS; // future: return fetch("/api/locations").then(r => r.json());
}
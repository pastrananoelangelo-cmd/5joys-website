import { JOBS } from "../../data/website/jobs";

export function getJobs() {
  return JOBS; // future: return fetch("/api/jobs").then(r => r.json());
}
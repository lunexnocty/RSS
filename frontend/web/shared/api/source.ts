import api from "./index";

export async function search() {
  return await api.post("/search/source", {});
}

export async function getStatus() {
  return await api.post("/search/status", {});
}

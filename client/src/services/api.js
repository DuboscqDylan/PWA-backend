export const API_BASE = "/api/songs";

export const fetchDetails = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Error fetching song");
  return res.json();
};

export const fetchSongs = async () => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Error fetching songs");
  return res.json();
};
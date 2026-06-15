export const parseSearch = (query = "") => {
  const regex = /"([^"]+)"|([^"\s]+)/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(query)) !== null) {
    tokens.push((match[1] || match[2]).trim().toLowerCase());
  }

  return tokens;
};

export const filterSongs = (songs, query) => {
  const tokens = parseSearch(query);

  return songs.filter((song) => {
    const searchableText = [song.name, song.genre, song.artistId]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return tokens.every((token) => searchableText.includes(token));
  });
};

import { useState, useEffect, useCallback, useRef } from "react";
const PAGE_SIZE = 20;

export function useSongsPagination() {
  const [allSongs, setAllSongs] = useState([]);   // full list from server
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all songs once
  useEffect(() => {
    fetch('/api/songs')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setAllSongs(data);
        setLoading(false);
        // if fewer than PAGE_SIZE, there’s never more to load
        if (data.length <= PAGE_SIZE) setHasMore(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Compute the visible page slice
  const songs = allSongs.slice(0, page * PAGE_SIZE);

  // Update hasMore when songs change
  useEffect(() => {
    if (allSongs.length > 0) {
      setHasMore(page * PAGE_SIZE < allSongs.length);
    }
  }, [page, allSongs]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  }, [loading, hasMore]);

  return { songs, loading, error, hasMore, loadMore };
}
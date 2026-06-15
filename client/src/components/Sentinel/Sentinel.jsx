import { useRef, useEffect } from "react";

export const Sentinel = ({ onIntersect, loading, hasMore }) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1 },
    );

    const current = sentinelRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [onIntersect, loading, hasMore]);

  if (!hasMore) return null;

  return <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />;
};

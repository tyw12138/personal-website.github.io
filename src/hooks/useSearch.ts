import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { getSearchIndex } from "@/lib/markdown";
import type { SearchEntry } from "@/types/article";

export function useSearch() {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(getSearchIndex(), {
      keys: [
        { name: "title", weight: 2 },
        { name: "tags", weight: 1.5 },
        { name: "summary", weight: 1 },
        { name: "contentPreview", weight: 0.5 },
      ],
      threshold: 0.3,
    });
  }, []);

  const results = useMemo<SearchEntry[]>(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map((r) => r.item);
  }, [fuse, query]);

  return { query, setQuery, results };
}

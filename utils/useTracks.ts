"use client";

import { useEffect, useState } from "react";

export function useTracks() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/manifests/tracks.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return data;
}

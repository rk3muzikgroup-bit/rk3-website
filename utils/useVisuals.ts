"use client";

import { useEffect, useState } from "react";

export function useVisuals() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/manifests/visuals.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return data;
}

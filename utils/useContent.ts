"use client";

import { useEffect, useState } from "react";

export function useContent() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/manifests/content.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return data;
}

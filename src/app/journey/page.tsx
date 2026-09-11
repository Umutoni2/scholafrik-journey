"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/paths";

export default function JourneyAliasPage() {
  useEffect(() => {
    window.location.replace(withBasePath("/") ?? "/");
  }, []);

  return (
    <p style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <a href={withBasePath("/") ?? "/"}>Continue to the journey</a>
    </p>
  );
}

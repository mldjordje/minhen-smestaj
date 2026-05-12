"use client";

import { useEffect } from "react";
export default function BootstrapInit(): null {
  useEffect(() => {
    // Only run in the browser
    if (typeof window !== "undefined") {
      // Dynamically import bootstrap JS
      import("bootstrap").then(() => {
        // Bootstrap loaded successfully
      });
    }

    (async () => {
      const { default: PureCounter } = await import("@srexi/purecounterjs");

      new PureCounter();
      new PureCounter({
        filesizing: true,
        selector: ".filesizecount",
        pulse: 2,
      });
    })();
  }, []);

  return null;
}

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisitTracker() {
  const pathname = usePathname();
  const lastTrackedRef = useRef({ path: "", timestamp: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const now = Date.now();
    // Debounce fast duplicated triggers on the same path within 3 seconds
    if (
      lastTrackedRef.current.path === pathname &&
      now - lastTrackedRef.current.timestamp < 3000
    ) {
      return;
    }

    lastTrackedRef.current = { path: pathname, timestamp: now };

    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://new-generation-school.onrender.com/api";

    const payload = {
      path: pathname || "/",
      referrer: document.referrer || "",
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      lang: navigator.language || "",
    };

    try {
      fetch(`${API_URL}/security/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Silent fail: tracking must never disrupt website experience
      });
    } catch (_) {
      // Ignore
    }
  }, [pathname]);

  return null;
}

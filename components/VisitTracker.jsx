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
      }).catch(() => {});
    } catch (_) {}
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const API_URL =
      process.env.NEXT_PUBLIC_API_URL || "https://new-generation-school.onrender.com/api";

    const handleClick = (e) => {
      const target = e.target.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const text = (target.textContent || "").trim().slice(0, 40);

      let action = null;
      let details = "";

      if (href.startsWith("tel:")) {
        action = "CLICK_PHONE_CALL";
        details = `Нажатие на звонок по номеру: ${href.replace("tel:", "")}`;
      } else if (href.includes("instagram.com")) {
        action = "CLICK_INSTAGRAM";
        details = `Переход в Instagram школы`;
      } else if (href.includes("t.me") || href.includes("telegram")) {
        action = "CLICK_TELEGRAM";
        details = `Переход в Telegram`;
      } else if (href === "/apply" || text.toLowerCase().includes("подать заявку")) {
        action = "CLICK_APPLY_BUTTON";
        details = `Нажата кнопка подачи заявки на странице: ${window.location.pathname}`;
      }

      if (action) {
        fetch(`${API_URL}/security/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname || "/",
            referrer: document.referrer || "",
            screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
            lang: navigator.language || "",
            details: `${action}: ${details}`,
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Root error boundary caught:", error);
  }, [error]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "500px", background: "white", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
        <h2 style={{ fontSize: "20px", color: "#002045", marginBottom: "12px", fontWeight: "700" }}>
          Временная ошибка загрузки
        </h2>
        <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
          {error?.message || "Произошла ошибка при загрузке страницы. Пожалуйста, обновите страницу."}
        </p>
        <button
          onClick={() => (reset ? reset() : window.location.reload())}
          style={{ background: "#002045", color: "white", padding: "10px 24px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}
        >
          Обновить страницу
        </button>
      </div>
    </div>
  );
}

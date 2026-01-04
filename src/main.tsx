import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { onAuthChange } from "@/lib/auth";

// Optional: log whenever user signs in or out
onAuthChange((user) => {
  console.log("🔐 Auth state changed:", user);
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

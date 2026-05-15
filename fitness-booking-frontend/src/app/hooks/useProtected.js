"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function decodeJwtPayload(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(payload.split("").map((c) => {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join("")));
  } catch {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = decodeJwtPayload(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}

export default function useProtected(allowedRoles = []) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");
      router.push("/login");
      return;
    }

    if (allowedRoles.length && !allowedRoles.includes(role)) {
      if (role === "admin") {
        router.push("/admin/services");
        return;
      }
      router.push("/services");
    }
  }, [router, allowedRoles.length, allowedRoles]);
}

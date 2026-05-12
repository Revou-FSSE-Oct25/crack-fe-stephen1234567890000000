"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useProtected(allowedRoles = []) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    if (!token) {
      router.push("/login");
    }

    if (allowedRoles.length && !allowedRoles.includes(role)) {
      if (role === "admin") {
        return router.push("/admin/services");
      }
      return router.push("/services");
    }
  }, [router, allowedRoles.length, allowedRoles]);
}

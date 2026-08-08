"use client";

import { useEffect, useState } from "react";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "student" | "faculty";
  department?: string;
  rollNumber?: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
}

"use client";

import { useEffect, useState } from "react";
import type { Role } from "@/lib/auth";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  rollNumber?: string;
  phone?: string;
  semester?: string;
  bio?: string;
  linkedIn?: string;
  gitHub?: string;
  resumeUrl?: string;
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

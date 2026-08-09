"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: "student" | "faculty" | "coordinator" | "admin";
  department?: string;
  rollNumber?: string;
  createdAt: string;
}

interface AnalyticsData {
  totalUsers: number;
  totalStudents: number;
  totalFaculty: number;
  totalCoordinators: number;
  totalAttendanceSessions: number;
  totalAssignments: number;
  totalSubmissions: number;
  totalEvents: number;
  totalPlacements: number;
}

export default function AdminPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, analyticsRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/analytics"),
      ]);

      const usersData = await usersRes.json();
      const analyticsData = await analyticsRes.json();

      if (usersData.users) setUsers(usersData.users);
      if (analyticsData.analytics) setAnalytics(analyticsData.analytics);
    } catch {
      toast.error("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userLoading && user?.role === "admin") loadData();
  }, [userLoading, user, loadData]);

  async function handleRoleChange(userId: string, newRole: string) {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ targetUserId: userId, newRole }),
    });
    if (!res.ok) {
      toast.error("Could not update role.");
      return;
    }
    toast.success("User role updated successfully.");
    loadData();
  }

  async function handleDeleteUser(userId: string, userName: string) {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return;
    const res = await fetch(`/api/admin/users?userId=${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      toast.error("Could not delete user.");
      return;
    }
    toast.success(`User "${userName}" deleted.`);
    loadData();
  }

  if (user?.role !== "admin") {
    return (
      <main>
        <Navbar user={user} />
        <div className="max-w-3xl mx-auto px-6 py-16 text-center space-y-4">
          <h1 className="font-display text-2xl text-rust">Access Denied</h1>
          <p className="text-sm text-ink/60 dark:text-parchment/60">
            Only Admins have full access to User Management, Role Assignment, and Analytics.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <div>
          <h1 className="font-display text-3xl mb-1">Admin Control Panel</h1>
          <p className="text-sm text-ink/60 dark:text-parchment/60">
            Full Access: User Management, Role Assignment, User Deletion, & Platform Analytics.
          </p>
        </div>

        {/* Analytics Bar */}
        {analytics && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs text-ink/50 dark:text-parchment/50">Total Registered Users</p>
              <p className="text-2xl font-display font-semibold mt-1">{analytics.totalUsers}</p>
            </div>
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs text-ink/50 dark:text-parchment/50">Students / Faculty</p>
              <p className="text-2xl font-display font-semibold mt-1">
                {analytics.totalStudents} / {analytics.totalFaculty}
              </p>
            </div>
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs text-ink/50 dark:text-parchment/50">Assignments / Submissions</p>
              <p className="text-2xl font-display font-semibold mt-1">
                {analytics.totalAssignments} / {analytics.totalSubmissions}
              </p>
            </div>
            <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-4 bg-ink/5 dark:bg-parchment/5">
              <p className="text-xs text-ink/50 dark:text-parchment/50">Events / Job Drives</p>
              <p className="text-2xl font-display font-semibold mt-1">
                {analytics.totalEvents} / {analytics.totalPlacements}
              </p>
            </div>
          </div>
        )}

        {/* User Management & Role Assignment Table */}
        <div className="rounded-xl border border-ink/15 dark:border-parchment/15 p-6 bg-ink/5 dark:bg-parchment/5 space-y-4">
          <h2 className="font-display text-xl font-medium">User Management & Role Assignment</h2>

          {loading ? (
            <p className="text-sm text-ink/50 dark:text-parchment/50 animate-pulse">Loading user directory…</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-ink/10 dark:border-parchment/10 text-ink/50 dark:text-parchment/50">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Current Role</th>
                    <th className="pb-3">Assign New Role</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 dark:divide-parchment/10">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-ink/5 dark:hover:bg-parchment/5">
                      <td className="py-3 font-medium">
                        {u.name}
                        {u.rollNumber && <span className="text-[10px] text-ink/40 dark:text-parchment/40"> ({u.rollNumber})</span>}
                      </td>
                      <td className="py-3">{u.email}</td>
                      <td className="py-3 capitalize">
                        <span className="rounded-full bg-brass/10 text-brass px-2.5 py-0.5 font-semibold">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u._id, e.target.value)}
                          className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-2.5 py-1 text-xs outline-none focus:border-brass"
                        >
                          <option value="student" className="bg-parchment dark:bg-ink">student</option>
                          <option value="faculty" className="bg-parchment dark:bg-ink">faculty</option>
                          <option value="coordinator" className="bg-parchment dark:bg-ink">coordinator</option>
                          <option value="admin" className="bg-parchment dark:bg-ink">admin</option>
                        </select>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDeleteUser(u._id, u.name)}
                          className="text-rust hover:underline font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

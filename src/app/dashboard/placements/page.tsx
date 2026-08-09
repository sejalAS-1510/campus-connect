"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { useCurrentUser } from "@/lib/useCurrentUser";

interface PlacementItem {
  _id: string;
  company: string;
  role: string;
  eligibility: string;
  ctc: string;
  description: string;
  deadline: string;
  applicantCount: number;
  applicationStatus?: string | null;
  createdBy?: { name: string };
}

interface ApplicantItem {
  _id: string;
  resumeUrl?: string;
  status: string;
  appliedAt: string;
  student?: {
    _id: string;
    name: string;
    email: string;
    rollNumber?: string;
    department?: string;
    phone?: string;
  };
}

export default function PlacementsPage() {
  const { user, loading: userLoading } = useCurrentUser();
  const [placements, setPlacements] = useState<PlacementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    company: "",
    role: "",
    eligibility: "",
    ctc: "",
    description: "",
    deadline: "",
  });
  const [creating, setCreating] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  // Drawer for Viewing Applicants (Admin/Coordinator/Faculty)
  const [openApplicantsId, setOpenApplicantsId] = useState<string | null>(null);
  const [applicantsList, setApplicantsList] = useState<ApplicantItem[]>([]);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/placements");
    const data = await res.json();
    if (data.placements) setPlacements(data.placements);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!userLoading) load();
  }, [userLoading, load]);

  async function createPlacement(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const res = await fetch("/api/placements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setCreating(false);
    if (!res.ok) {
      const data = await res.json();
      toast.error(data.error || "Could not create placement drive.");
      return;
    }
    toast.success("Placement drive published.");
    setForm({ company: "", role: "", eligibility: "", ctc: "", description: "", deadline: "" });
    load();
  }

  async function applyPlacement(placementId: string) {
    const res = await fetch("/api/placements/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ placementId, resumeUrl }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Could not submit application.");
      return;
    }
    toast.success("Applied successfully for placement drive!");
    load();
  }

  async function fetchApplicants(placementId: string) {
    if (openApplicantsId === placementId) {
      setOpenApplicantsId(null);
      return;
    }
    setOpenApplicantsId(placementId);
    setLoadingApplicants(true);
    try {
      const res = await fetch(`/api/placements/applications?placementId=${placementId}`);
      const data = await res.json();
      if (data.applications) setApplicantsList(data.applications);
    } catch {
      toast.error("Failed to load applicants.");
    } finally {
      setLoadingApplicants(false);
    }
  }

  const canManage = ["coordinator", "admin"].includes(user?.role || "");

  return (
    <main>
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display text-3xl mb-8">Placement Notices & Job Drives</h1>

        {canManage && (
          <form
            onSubmit={createPlacement}
            className="rounded-lg border border-ink/15 dark:border-parchment/15 p-5 mb-8 space-y-3"
          >
            <h2 className="font-display text-lg">Post New Placement Opportunity</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <input
                required
                placeholder="Company Name (e.g. Google)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <input
                required
                placeholder="Job Role (e.g. SDE-1)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <input
                required
                placeholder="Package CTC (e.g. 18 LPA)"
                value={form.ctc}
                onChange={(e) => setForm({ ...form, ctc: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                placeholder="Eligibility (e.g. B.Tech CS/IT > 7.0 CGPA)"
                value={form.eligibility}
                onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
              />
              <div>
                <input
                  required
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
                />
              </div>
            </div>
            <textarea
              required
              placeholder="Job Details & Selection Process"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-2 text-sm outline-none focus:border-brass"
            />
            <button
              disabled={creating}
              className="rounded-full bg-ink text-parchment dark:bg-parchment dark:text-ink px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {creating ? "Posting Drive…" : "Post Job Drive"}
            </button>
          </form>
        )}

        {loading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-28 rounded-lg bg-ink/10 dark:bg-parchment/10" />
            ))}
          </div>
        ) : placements.length === 0 ? (
          <div className="rounded-lg border border-dashed border-ink/20 dark:border-parchment/20 p-10 text-center text-sm text-ink/50 dark:text-parchment/50">
            No active placement drives posted yet.
          </div>
        ) : (
          <div className="space-y-4">
            {placements.map((p) => (
              <div key={p._id} className="rounded-lg border border-ink/15 dark:border-parchment/15 p-5 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {p.company} <span className="text-sm font-normal text-brass">· {p.role}</span>
                    </h3>
                    <p className="text-xs text-ink/50 dark:text-parchment/50 mt-1">
                      Package CTC: <strong className="text-ink dark:text-parchment">{p.ctc}</strong> · Eligibility: {p.eligibility}
                    </p>
                  </div>
                  <span className="text-xs rounded-full bg-brass/10 text-brass px-3 py-1 font-medium">
                    Deadline: {new Date(p.deadline).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-ink/70 dark:text-parchment/70 leading-relaxed">{p.description}</p>

                <div className="pt-3 border-t border-ink/10 dark:border-parchment/10 flex flex-wrap items-center justify-between gap-3">
                  {canManage ? (
                    <button
                      onClick={() => fetchApplicants(p._id)}
                      className="text-xs rounded-full bg-brass/15 text-brass hover:bg-brass/25 px-3.5 py-1.5 font-medium transition-colors"
                    >
                      {openApplicantsId === p._id ? "Close Applicants" : `${p.applicantCount} Applicants`}
                    </button>
                  ) : (
                    <span className="text-xs text-ink/50 dark:text-parchment/50 font-medium">
                      {p.applicantCount} Student{p.applicantCount !== 1 ? "s" : ""} Applied
                    </span>
                  )}

                  {p.applicationStatus ? (
                    <span className="text-xs font-semibold rounded-full bg-moss/10 text-moss px-3.5 py-1.5 capitalize">
                      Status: {p.applicationStatus}
                    </span>
                  ) : user?.role === "student" ? (
                    <div className="flex items-center gap-2">
                      <input
                        placeholder="Resume Link (Google Drive / GitHub)"
                        value={resumeUrl}
                        onChange={(e) => setResumeUrl(e.target.value)}
                        className="rounded-lg border border-ink/15 dark:border-parchment/20 bg-transparent px-3 py-1.5 text-xs outline-none focus:border-brass w-60"
                      />
                      <button
                        onClick={() => applyPlacement(p._id)}
                        className="rounded-full bg-brass text-parchment px-4 py-1.5 text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        Apply Now
                      </button>
                    </div>
                  ) : null}
                </div>

                {/* Applicants Drawer for Coordinators / Admin / Faculty */}
                {openApplicantsId === p._id && (
                  <div className="mt-4 border-t border-ink/10 dark:border-parchment/10 pt-4">
                    <h4 className="text-sm font-medium mb-3">Applied Students</h4>
                    {loadingApplicants ? (
                      <p className="text-xs text-ink/50 dark:text-parchment/50 animate-pulse">Loading applicants…</p>
                    ) : applicantsList.length === 0 ? (
                      <p className="text-xs text-ink/50 dark:text-parchment/50 italic">No applications received yet.</p>
                    ) : (
                      <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {applicantsList.map((app) => (
                          <li
                            key={app._id}
                            className="rounded-md border border-ink/10 dark:border-parchment/10 p-3 bg-ink/5 dark:bg-parchment/5 text-xs flex flex-wrap items-center justify-between gap-2"
                          >
                            <div>
                              <p className="font-semibold">
                                {app.student?.name || "Student"}
                                {app.student?.rollNumber && ` (${app.student.rollNumber})`}
                              </p>
                              <p className="text-[11px] text-ink/50 dark:text-parchment/50">
                                Email: {app.student?.email} · Applied {new Date(app.appliedAt).toLocaleDateString()}
                              </p>
                            </div>
                            {app.resumeUrl ? (
                              <a
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brass underline font-medium text-xs hover:opacity-80"
                              >
                                View Resume ↗
                              </a>
                            ) : (
                              <span className="text-[10px] text-ink/40 dark:text-parchment/40">No resume link attached</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

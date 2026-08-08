import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "CampusConnect",
  description: "One place for attendance, assignments, and campus life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen">
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}

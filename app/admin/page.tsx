import type { Metadata } from "next";
import AdminPage from "@/components/AdminPage";

export const metadata: Metadata = {
  title: "Admin - Certifica Ingeniería",
  description: "Panel de administración interno",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Admin() {
  return <AdminPage />;
}


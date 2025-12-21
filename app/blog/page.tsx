import type { Metadata } from "next";
import { BlogPage } from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Blog - Artículos sobre eficiencia energética | Certifica Ingeniería",
  description: "Guías prácticas, normativas actualizadas y casos reales para ayudarte a entender y mejorar la eficiencia energética de tu edificio.",
  keywords: ["blog", "eficiencia energética", "renovables", "certificación energética", "normativas", "auditorías", "Madrid"],
  openGraph: {
    title: "Blog - Certifica Ingeniería",
    description: "Artículos sobre eficiencia energética y renovables.",
    type: "website",
  },
};

export default function Blog() {
  return <BlogPage />;
}


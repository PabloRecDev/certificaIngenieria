import type { Metadata } from "next";
import { BlogPage } from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "Blog - Artículos sobre Construcción y Obra Nueva Residencial | Certifica Ingeniería",
  description: "Artículos y guías sobre construcción, obra nueva residencial, eficiencia energética y rehabilitación de edificios. Consejos prácticos y casos reales de proyectos en Madrid.",
  keywords: [
    "blog construcción",
    "artículos obra nueva",
    "guías construcción",
    "eficiencia energética edificios",
    "rehabilitación edificios",
    "consejos construcción",
    "Madrid",
  ],
  openGraph: {
    title: "Blog - Artículos sobre Construcción y Obra Nueva Residencial",
    description: "Artículos y guías sobre construcción, obra nueva residencial y eficiencia energética.",
    type: "website",
    url: "https://certificaingenieria.com/blog",
  },
  alternates: {
    canonical: "https://certificaingenieria.com/blog",
  },
};

export default function Blog() {
  return <BlogPage />;
}


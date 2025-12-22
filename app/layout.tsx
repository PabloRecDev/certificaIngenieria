import type { Metadata } from "next";
import "./globals.css";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://certificaingenieria.com"),
  title: {
    default: "Certifica Ingeniería - Constructora especializada en obra nueva residencial en Madrid",
    template: "%s | Certifica Ingeniería",
  },
  description: "Constructora especializada en obra nueva residencial. Construimos viviendas unifamiliares y edificios en bloque desde el proyecto hasta la entrega de llaves en Madrid y Comunidad de Madrid.",
  keywords: [
    "constructora Madrid",
    "obra nueva residencial",
    "viviendas unifamiliares Madrid",
    "edificios residenciales",
    "promociones vivienda",
    "constructora Carabanchel",
    "dirección de obra",
    "coordinación de oficios",
    "viviendas llave en mano",
    "edificios en bloque",
  ],
  authors: [{ name: "Certifica Ingeniería" }],
  creator: "Certifica Ingeniería",
  publisher: "Certifica Ingeniería",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/favicon.jpeg",
    shortcut: "/assets/favicon.jpeg",
    apple: "/assets/favicon.jpeg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://certificaingenieria.com",
    siteName: "Certifica Ingeniería",
    title: "Certifica Ingeniería - Constructora especializada en obra nueva residencial",
    description: "Construimos viviendas unifamiliares y edificios en bloque desde el proyecto hasta la entrega de llaves en Madrid.",
    images: [
      {
        url: "/assets/img4.jpeg",
        width: 1200,
        height: 630,
        alt: "Certifica Ingeniería - Constructora especializada en obra nueva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifica Ingeniería - Constructora especializada en obra nueva residencial",
    description: "Construimos viviendas unifamiliares y edificios en bloque desde el proyecto hasta la entrega de llaves.",
    images: ["/assets/img4.jpeg"],
  },
  alternates: {
    canonical: "https://certificaingenieria.com",
  },
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://certificaingenieria.com",
    name: "Certifica Ingeniería",
    description: "Constructora especializada en obra nueva residencial. Construimos viviendas unifamiliares y edificios en bloque en Madrid.",
    url: "https://certificaingenieria.com",
    telephone: "+34614069154",
    email: "administración@certificaingenieria.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Haya 13",
      addressLocality: "Carabanchel",
      addressRegion: "Madrid",
      postalCode: "28044",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "40.3800",
      longitude: "-3.7200",
    },
    areaServed: {
      "@type": "City",
      name: "Madrid",
    },
    serviceType: [
      "Obra nueva residencial",
      "Viviendas unifamiliares",
      "Edificios en bloque",
      "Rehabilitación y SATE",
      "Eficiencia energética",
    ],
    sameAs: [
      // Agregar redes sociales si las tienen
    ],
  };

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}


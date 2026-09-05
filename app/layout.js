import { Inter, Manrope } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://new-generation-school-lovat.vercel.app"),
  title: {
    default: "New Generation School — Частная школа «Новое Поколение» Фергана",
    template: "%s | New Generation School",
  },
  description:
    "Частная инновационная школа НОУ «Новое Поколение» (New Generation School / NGS) в Фергане. Качественное образование от дошкольного отделения (5-7 лет) до 11 класса, сильные преподаватели, олимпиадная подготовка и поступление в ведущие мировые университеты.",
  keywords: [
    "New Generation School",
    "Новое Поколение",
    "НОУ Новое Поколение",
    "НОУ новое поколение",
    "New Generation School Fergana",
    "NGS Fergana",
    "NGS",
    "школа Новое Поколение",
    "школа Новое Поколение Фергана",
    "частная школа Фергана",
    "частные школы Фергана",
    "лицей Фергана",
    "дошкольное образование Фергана",
    "подготовка к школе Фергана",
    "частные школы Узбекистана",
  ],
  authors: [{ name: "New Generation School" }],
  creator: "New Generation School",
  publisher: "New Generation School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "New Generation School — Частная школа «Новое Поколение» Фергана",
    description:
      "Инновационная частная школа в Фергане: углубленное обучение, современные технологии, сильные наставники и подготовка к топовым мировым вузам.",
    url: "https://new-generation-school-lovat.vercel.app",
    siteName: "New Generation School (НОУ «Новое Поколение»)",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "New Generation School — Частная школа «Новое Поколение» Фергана",
    description:
      "Инновационная частная школа в Фергане: образование мирового уровня от дошколят до выпускных классов.",
  },
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "New Generation School",
  alternateName: [
    "НОУ «Новое Поколение»",
    "Новое Поколение",
    "NGS",
    "New Generation School Fergana",
    "Частная школа Новое Поколение",
  ],
  url: "https://new-generation-school-lovat.vercel.app",
  logo: "https://new-generation-school-lovat.vercel.app/ЛОГО.png",
  description:
    "Ведущая инновационная частная школа в Фергане. Полный цикл качественного среднего и дошкольного образования.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Мукинат, 103",
    addressLocality: "Фергана",
    addressRegion: "Ферганская область",
    addressCountry: "UZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.3833,
    longitude: 71.7833,
  },
  telephone: "+998 73 244 00 22",
  sameAs: [
    "https://schools.emaktab.uz/v2/school?school=1000003044475",
    "https://www.instagram.com/ngs.fergana",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} scroll-smooth h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#EEF2F6]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

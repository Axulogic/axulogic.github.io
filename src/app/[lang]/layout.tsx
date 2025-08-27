import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { i18n, type Locale } from "@/i18n-config";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: "Axulogic - Managing Open Source Organizations Efficiently",
  description: "Axulogic is a GitHub parent organization that manages and coordinates multiple sub-organizations across different domains. From indie game development to enterprise solutions, we foster collaboration and innovation.",
  keywords: ["open source", "github", "organizations", "development", "collaboration", "innovation", "technology", "software", "community"],
  authors: [{ name: "Axulogic Team" }],
  creator: "Axulogic",
  publisher: "Axulogic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://axulogic.uk'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'pt-BR': '/pt-BR',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://axulogic.uk',
    siteName: 'Axulogic',
    title: 'Axulogic - Managing Open Source Organizations Efficiently',
    description: 'Axulogic is a GitHub parent organization that manages and coordinates multiple sub-organizations across different domains. From indie game development to enterprise solutions, we foster collaboration and innovation.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/Axulogic/axulogic.github.io/refs/heads/main/public/assets/print.png',
        width: 1200,
        height: 630,
        alt: 'Axulogic - Open Source Organization Management',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Axulogic',
    creator: '@Axulogic',
    title: 'Axulogic - Managing Open Source Organizations Efficiently',
    description: 'Axulogic is a GitHub parent organization that manages and coordinates multiple sub-organizations across different domains. From indie game development to enterprise solutions, we foster collaboration and innovation.',
    images: ['https://raw.githubusercontent.com/Axulogic/axulogic.github.io/refs/heads/main/public/assets/print.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/assets/Noma1ColorIcon.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/Noma1ColorIcon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/assets/Noma1ColorIcon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/assets/Noma1ColorIcon.png', color: '#00ffff' },
    ],
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#00ffff',
    'msapplication-TileColor': '#00ffff',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: any;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Share+Tech+Mono&family=IBM+Plex+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
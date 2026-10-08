import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { ChatLauncher } from '@/components/chat-launcher';
import { site } from '@/data/site';
import { siteUrl } from '@/lib/metadata';
import './globals.css';
const inter = localFont({
  src: '../assets/fonts/inter-latin.woff2',
  variable: '--font-inter',
  display: 'swap',
});
const montserrat = localFont({
  src: '../assets/fonts/montserrat-latin.woff2',
  variable: '--font-montserrat',
  display: 'swap',
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KawanKampus',
  description: site.description,
  applicationName: site.name,
  icons: { icon: '/icon.svg' },
  openGraph: { locale: 'id_ID', siteName: site.name, type: 'website' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&sessionStorage.getItem('kawan-kampus-welcome-v1')!=='seen'){document.documentElement.dataset.welcomePending='true';}}catch(e){document.documentElement.dataset.welcomePending='true';}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a href="#main-content" className="skip-link">
            Lewati ke konten utama
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
          <ChatLauncher />
        </ThemeProvider>
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  );
}

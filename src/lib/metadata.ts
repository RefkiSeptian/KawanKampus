import type { Metadata } from 'next';
import { site } from '@/data/site';
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000');
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: 'KawanKampus' },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      locale: 'id_ID',
      type: 'website',
      siteName: site.name,
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Kawan Kampus — Kenali peluang selama kuliah',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
      images: ['/opengraph-image'],
    },
  };
}

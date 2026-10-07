import type { MetadataRoute } from 'next';
import { categories } from '@/data/categories';
import { siteUrl } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/jelajahi-peluang',
    '/kuis',
    '/tentang',
    ...categories.map((category) => `/peluang/${category.id}`),
  ].map((path) => ({
    url: new URL(path, siteUrl).href,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.7,
  }));
}

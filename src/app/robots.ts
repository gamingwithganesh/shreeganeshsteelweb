import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shreeganeshsteel.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/super-admin/', '/api/admin/', '/api/super-admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

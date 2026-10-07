import Link from 'next/link';
import { site } from '@/data/site';
import { socialLinks } from '@/data/social';
import { navigation } from '@/data/navigation';
import { Brand } from './brand';
import { ThemeControl } from './theme-provider';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand footer />
          <p>{site.footerDescription}</p>
        </div>
        <nav className="footer-nav" aria-label="Navigasi footer">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="footer-social" aria-label="Media sosial Kawan Kampus">
          {socialLinks.map((social) => {
            const icon = social.platform === 'instagram' ? <InstagramLogo /> : <XLogo />;
            return social.url ? (
              <a
                key={social.platform}
                className="social-link"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} (tab baru)`}
              >
                {icon}
              </a>
            ) : (
              <button
                key={social.platform}
                type="button"
                className="social-link"
                disabled
                aria-label={`${social.label} — tautan belum tersedia`}
                title={`${social.label} belum tersedia`}
              >
                {icon}
              </button>
            );
          })}
        </div>
      </div>
      <div className="container footer-bottom">
        <small>© {new Date().getFullYear()} Kawan Kampus</small>
        <ThemeControl />
      </div>
    </footer>
  );
}

function XLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.2l7.2-8.2L.8 2h6.5l4.4 5.9L18.9 2Zm-1.1 18h1.8L6.4 4H4.5l13.3 16Z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

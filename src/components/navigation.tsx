'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { Brand } from './brand';
import { ThemeControl } from './theme-provider';
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null),
    dialogRef = useRef<HTMLDialogElement>(null),
    triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      navRef.current?.style.setProperty('--scroll-progress', String(p));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  useEffect(() => {
    const dialog = dialogRef.current;
    // The native dialog handles Escape/focus trapping; only its backdrop needs pointer dismissal.
    const dismissBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) {
        dialog?.close();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    dialog?.addEventListener('click', dismissBackdrop);
    return () => dialog?.removeEventListener('click', dismissBackdrop);
  }, []);
  const active = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname.startsWith(href) ||
        (href === '/jelajahi-peluang' && pathname.startsWith('/peluang/'));
  function closeMenu() {
    dialogRef.current?.close();
    setOpen(false);
    triggerRef.current?.focus();
  }
  return (
    <>
      <header className="site-header" ref={navRef}>
        <Brand />
        <nav aria-label="Navigasi utama" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeControl />
          <button
            className="menu-trigger icon-button"
            ref={triggerRef}
            aria-label="Buka menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              dialogRef.current?.showModal();
              setOpen(true);
            }}
          >
            <Menu size={23} />
          </button>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className="mobile-menu"
        aria-labelledby="menu-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <span id="menu-title">Jelajahi Kawan Kampus</span>
          <button aria-label="Tutup menu" className="icon-button" onClick={closeMenu}>
            <X />
          </button>
        </div>
        <nav aria-label="Navigasi mobile">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              aria-current={active(item.href) ? 'page' : undefined}
            >
              {item.label}
              <ArrowUpRight size={21} />
            </Link>
          ))}
        </nav>
        <p className="muted">Satu langkah kecil. Banyak kemungkinan.</p>
        <Link href="/kuis" className="button primary" onClick={closeMenu}>
          Temukan Minatku <ArrowUpRight size={19} />
        </Link>
      </dialog>
    </>
  );
}

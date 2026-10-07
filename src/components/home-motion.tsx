'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Asterisk } from 'lucide-react';
import { BrandWordmark } from './brand';
import { homeDesign } from '@/data/home';
import styles from './home-motion.module.css';

const welcomeKey = 'kawan-kampus-welcome-v1';
let welcomeSeen = false;

export function HomeMotion({ children, className }: { children: ReactNode; className: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function enter() {
    const root = rootRef.current;
    if (root) root.dataset.entered = 'true';
  }

  function finishWelcome() {
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = null;
    welcomeSeen = true;
    try {
      sessionStorage.setItem(welcomeKey, 'seen');
    } catch {
      /* Session fallback stays in memory. */
    }
    dialogRef.current?.close();
    if (rootRef.current) {
      rootRef.current.dataset.introFinished = 'true';
      rootRef.current.dataset.heroEngaged = 'true';
    }
    enter();
    const heading = rootRef.current?.querySelector('h1');
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }

  function leaveWelcome() {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.dataset.leaving === 'true') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return finishWelcome();
    dialog.dataset.leaving = 'true';
    exitTimer.current = setTimeout(finishWelcome, 650);
  }

  useLayoutEffect(() => {
    const root = rootRef.current;
    const dialog = dialogRef.current;
    if (!root || !dialog) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const art = root.querySelector<HTMLElement>('[data-home-art]');
    const engageHero = () => {
      if (!preference.matches && root.dataset.heroEngaged !== 'true')
        root.dataset.heroEngaged = 'true';
    };
    const resetParallax = () => {
      art?.style.setProperty('--pointer-x', '0px');
      art?.style.setProperty('--pointer-y', '0px');
    };
    const moveParallax = (event: PointerEvent) => {
      if (!art || preference.matches || event.pointerType !== 'mouse') return;
      engageHero();
      const bounds = art.getBoundingClientRect();
      art.style.setProperty(
        '--pointer-x',
        `${((event.clientX - bounds.left) / bounds.width - 0.5) * 20}px`,
      );
      art.style.setProperty(
        '--pointer-y',
        `${((event.clientY - bounds.top) / bounds.height - 0.5) * 20}px`,
      );
    };
    const reveals = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    );
    reveals.forEach((node) => observer.observe(node));
    const focusReveal = (event: FocusEvent) => {
      (event.target as HTMLElement)
        ?.closest<HTMLElement>('[data-reveal]')
        ?.setAttribute('data-revealed', 'true');
    };
    const updateVisibility = () => {
      root.dataset.documentHidden = String(document.hidden);
    };
    const updatePreference = () => {
      root.dataset.homeMotion = preference.matches ? 'reduced' : 'active';
      if (preference.matches) {
        resetParallax();
        if (exitTimer.current) clearTimeout(exitTimer.current);
        exitTimer.current = null;
        if (dialog.open) {
          dialog.close();
          welcomeSeen = true;
          try {
            sessionStorage.setItem(welcomeKey, 'seen');
          } catch {
            /* Memory fallback. */
          }
          const heading = root.querySelector('h1');
          if (heading) {
            heading.tabIndex = -1;
            heading.focus({ preventScroll: true });
          }
        }
        root.dataset.entered = 'true';
      }
    };
    updatePreference();
    updateVisibility();
    let seen = welcomeSeen;
    try {
      seen ||= sessionStorage.getItem(welcomeKey) === 'seen';
    } catch {
      /* Memory fallback. */
    }
    if (!seen && !preference.matches) {
      dialog.dataset.leaving = 'false';
      try {
        dialog.showModal();
      } catch {
        root.dataset.entered = 'true';
      }
    } else root.dataset.entered = 'true';
    delete document.documentElement.dataset.welcomePending;
    root.addEventListener('focusin', focusReveal);
    root.addEventListener('pointermove', engageHero, { once: true });
    root.addEventListener('pointerdown', engageHero);
    window.addEventListener('wheel', engageHero, { passive: true, once: true });
    art?.addEventListener('pointermove', moveParallax);
    art?.addEventListener('pointerleave', resetParallax);
    document.addEventListener('visibilitychange', updateVisibility);
    preference.addEventListener('change', updatePreference);
    return () => {
      observer.disconnect();
      root.removeEventListener('focusin', focusReveal);
      root.removeEventListener('pointermove', engageHero);
      root.removeEventListener('pointerdown', engageHero);
      window.removeEventListener('wheel', engageHero);
      art?.removeEventListener('pointermove', moveParallax);
      art?.removeEventListener('pointerleave', resetParallax);
      document.removeEventListener('visibilitychange', updateVisibility);
      preference.removeEventListener('change', updatePreference);
      if (exitTimer.current) clearTimeout(exitTimer.current);
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <div ref={rootRef} className={className} data-home-motion="pending">
      {children}
      <dialog
        ref={dialogRef}
        className={styles.welcome}
        data-welcome-cover
        aria-labelledby="welcome-title"
        aria-describedby="welcome-description"
        onCancel={(event) => {
          event.preventDefault();
          leaveWelcome();
        }}
      >
        <div className={styles.collage} aria-hidden="true">
          {['organisasi', 'lomba', 'beasiswa', 'internasional'].map((name, index) => (
            <div key={name} className={`${styles.photo} ${styles[`photo${index}`]}`}>
              <Image
                src={`/images/home/${name}.webp`}
                width={800}
                height={600}
                alt=""
                loading={index < 2 ? 'eager' : 'lazy'}
                sizes="(max-width: 600px) 55vw, 34vw"
                className={styles.photoGlow}
              />
              <Image
                src={`/images/home/${name}.webp`}
                width={800}
                height={600}
                alt=""
                loading={index < 2 ? 'eager' : 'lazy'}
                fetchPriority={index < 2 ? 'high' : 'auto'}
                sizes="(max-width: 600px) 55vw, 34vw"
                className={styles.photoImage}
              />
            </div>
          ))}
          <Asterisk className={styles.sparkOne} />
          <Asterisk className={styles.sparkTwo} />
        </div>
        <div className={styles.title}>
          <h2 id="welcome-title" aria-label={homeDesign.welcomeTitle}>
            <BrandWordmark />
          </h2>
          <p id="welcome-description">{homeDesign.welcomeDescription}</p>
          <button type="button" onClick={leaveWelcome} className={styles.start}>
            {homeDesign.welcomeStart}
            <ArrowUpRight size={21} aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </div>
  );
}

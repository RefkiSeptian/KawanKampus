'use client';
import { useEffect, useRef, type ReactNode } from 'react';

export function PageMotion({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = 'true';
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    );
    const register = () =>
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((node) => {
        if (node.getBoundingClientRect().top < innerHeight - 24) node.dataset.revealed = 'true';
        else observer.observe(node);
      });
    register();
    const mutate = new MutationObserver(register);
    mutate.observe(root, { childList: true, subtree: true });
    const update = () => {
      root.dataset.pageMotion = preference.matches ? 'reduced' : 'active';
    };
    const focus = (event: FocusEvent) =>
      (event.target as HTMLElement)
        .closest<HTMLElement>('[data-reveal]')
        ?.setAttribute('data-revealed', 'true');
    update();
    preference.addEventListener('change', update);
    root.addEventListener('focusin', focus);
    return () => {
      observer.disconnect();
      mutate.disconnect();
      preference.removeEventListener('change', update);
      root.removeEventListener('focusin', focus);
    };
  }, []);
  return (
    <div ref={ref} className={`${className} page-motion`} data-page-motion="pending">
      {children}
    </div>
  );
}

'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
} from 'react';

type Point = { x: number; y: number };
type View = { left: number; top: number; width: number; height: number };
const layoutKey = 'kawan-kampus-chat-position-v1';
const gap = 14;

function viewport(): View {
  const visual = window.visualViewport;
  return {
    left: visual?.offsetLeft || 0,
    top: visual?.offsetTop || 0,
    width: visual?.width || window.innerWidth,
    height: visual?.height || window.innerHeight,
  };
}
function fit(point: Point, size: { width: number; height: number }, view: View): Point {
  return {
    x: Math.min(
      Math.max(view.left + gap, point.x),
      Math.max(view.left + gap, view.left + view.width - size.width - gap),
    ),
    y: Math.min(
      Math.max(view.top + gap, point.y),
      Math.max(view.top + gap, view.top + view.height - size.height - gap),
    ),
  };
}
function savedPosition(): Point | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = JSON.parse(sessionStorage.getItem(layoutKey) || 'null');
    return value && Number.isFinite(value.x) && Number.isFinite(value.y) ? value : null;
  } catch {
    return null;
  }
}
function remember(point: Point | null) {
  try {
    if (point) sessionStorage.setItem(layoutKey, JSON.stringify(point));
    else sessionStorage.removeItem(layoutKey);
  } catch {
    /* Position still works in memory. */
  }
}

export function useChatWindow(
  panel: RefObject<HTMLElement | null>,
  open: boolean,
  expanded: boolean,
  minimized: boolean,
) {
  const [position, setPosition] = useState<Point | null>(savedPosition);
  const [view, setView] = useState<View | null>(null);
  const [dragging, setDragging] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const current = useRef(position);
  const frame = useRef<number | null>(null);
  const gesture = useRef<{
    pointer: number;
    start: Point;
    origin: Point;
    width: number;
    height: number;
    handle: HTMLButtonElement;
  } | null>(null);

  useEffect(() => {
    if (!open || !panel.current) return;
    const node = panel.current;
    const adjust = () => {
      const nextView = viewport();
      setView((previous) =>
        previous &&
        Object.keys(nextView).every(
          (key) => previous[key as keyof View] === nextView[key as keyof View],
        )
          ? previous
          : nextView,
      );
      if (expanded || gesture.current) return;
      const rect = node.getBoundingClientRect();
      const next = fit(current.current || { x: rect.left, y: rect.top }, rect, nextView);
      if (Math.abs(next.x - rect.left) > 1 || Math.abs(next.y - rect.top) > 1) {
        current.current = next;
        setPosition(next);
        remember(next);
      }
    };
    const initialFrame = requestAnimationFrame(adjust);
    const observer = new ResizeObserver(adjust);
    observer.observe(node);
    window.addEventListener('resize', adjust);
    window.visualViewport?.addEventListener('resize', adjust);
    window.visualViewport?.addEventListener('scroll', adjust);
    return () => {
      cancelAnimationFrame(initialFrame);
      observer.disconnect();
      window.removeEventListener('resize', adjust);
      window.visualViewport?.removeEventListener('resize', adjust);
      window.visualViewport?.removeEventListener('scroll', adjust);
    };
  }, [panel, open, expanded, minimized]);
  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  function start(event: PointerEvent<HTMLButtonElement>) {
    if (expanded || event.button !== 0 || !event.isPrimary || !panel.current) return;
    const rect = panel.current.getBoundingClientRect();
    const origin = { x: rect.left, y: rect.top };
    gesture.current = {
      pointer: event.pointerId,
      start: { x: event.clientX, y: event.clientY },
      origin,
      width: rect.width,
      height: rect.height,
      handle: event.currentTarget,
    };
    current.current = origin;
    setPosition(origin);
    setDragging(true);
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const drag = gesture.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    current.current = fit(
      {
        x: drag.origin.x + event.clientX - drag.start.x,
        y: drag.origin.y + event.clientY - drag.start.y,
      },
      drag,
      viewport(),
    );
    if (frame.current === null)
      frame.current = requestAnimationFrame(() => {
        setPosition(current.current);
        frame.current = null;
      });
  }
  const end = useCallback(() => {
    const drag = gesture.current;
    if (!drag) return;
    gesture.current = null;
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
    setPosition(current.current);
    setDragging(false);
    remember(current.current);
    if (drag.handle.hasPointerCapture(drag.pointer))
      drag.handle.releasePointerCapture(drag.pointer);
    setAnnouncement('Panel dipindahkan.');
  }, []);
  function dock() {
    end();
    current.current = null;
    setPosition(null);
    remember(null);
    setAnnouncement('Panel kembali ke posisi awal.');
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (expanded || !panel.current) return;
    if (event.key === 'Home') {
      event.preventDefault();
      dock();
      return;
    }
    if (event.key === 'Escape' && gesture.current) {
      event.preventDefault();
      event.stopPropagation();
      current.current = gesture.current.origin;
      end();
      return;
    }
    const directions: Record<string, Point> = {
      ArrowLeft: { x: -1, y: 0 },
      ArrowRight: { x: 1, y: 0 },
      ArrowUp: { x: 0, y: -1 },
      ArrowDown: { x: 0, y: 1 },
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const rect = panel.current.getBoundingClientRect();
    const origin = current.current || { x: rect.left, y: rect.top };
    const step = event.shiftKey ? 40 : 16;
    const next = fit(
      { x: origin.x + direction.x * step, y: origin.y + direction.y * step },
      rect,
      viewport(),
    );
    current.current = next;
    setPosition(next);
    remember(next);
    setAnnouncement(`Posisi panel: ${Math.round(next.x)}, ${Math.round(next.y)}.`);
  }
  const style = {
    ...(view
      ? { '--chat-view-height': `${view.height}px`, '--chat-view-width': `${view.width}px` }
      : {}),
    ...(expanded && view
      ? { left: view.left + view.width / 2, top: view.top + 16, right: 'auto', bottom: 'auto' }
      : !expanded && position
        ? { left: position.x, top: position.y, right: 'auto', bottom: 'auto' }
        : {}),
  } as CSSProperties;
  return {
    style,
    dragging,
    positioned: position !== null,
    smallViewport: view ? view.height < 480 : false,
    announcement,
    dock,
    end,
    handle: {
      onPointerDown: start,
      onPointerMove: move,
      onPointerUp: end,
      onPointerCancel: end,
      onLostPointerCapture: end,
      onKeyDown: keyboard,
    },
  };
}

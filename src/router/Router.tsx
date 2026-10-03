import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { RouterContext, type NavigateOptions, type RouterValue } from './routerContext';

type Location = {
  pathname: string;
  hash: string;
};

function readLocation(): Location {
  return { pathname: window.location.pathname, hash: window.location.hash };
}

/**
 * Minimal history-API router: renders one page per URL without a routing
 * dependency. Wrap the app in it, then read the location with `useRouter`.
 */
export function Router({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location>(readLocation);

  useEffect(() => {
    const handlePopState = () => setLocation(readLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    const target = new URL(to, window.location.origin);

    if (target.origin !== window.location.origin) {
      window.location.assign(target.href);
      return;
    }

    const next = `${target.pathname}${target.search}${target.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next === current) {
      return;
    }

    if (options?.replace === true) {
      window.history.replaceState({}, '', next);
    } else {
      window.history.pushState({}, '', next);
    }
    setLocation(readLocation());
  }, []);

  const value = useMemo<RouterValue>(
    () => ({ pathname: location.pathname, hash: location.hash, navigate }),
    [location, navigate],
  );

  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const anchorId = location.hash.startsWith('#') ? location.hash.slice(1) : '';
    const anchor = anchorId === '' ? null : document.getElementById(anchorId);

    if (anchor !== null) {
      anchor.scrollIntoView({ block: 'start' });
      if (anchor.hasAttribute('tabindex')) {
        anchor.focus({ preventScroll: true });
      }
      return;
    }

    window.scrollTo({ top: 0 });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [location]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

import { useEffect } from 'react';

/** Keeps the browser tab title in sync with the page being viewed. */
export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

import { createContext, useContext } from 'react';

export type NavigateOptions = {
  replace?: boolean;
};

export type RouterValue = {
  pathname: string;
  hash: string;
  navigate: (to: string, options?: NavigateOptions) => void;
};

export const RouterContext = createContext<RouterValue | null>(null);

/** Gives the current location and a client-side navigate function. */
export function useRouter(): RouterValue {
  const value = useContext(RouterContext);
  if (value === null) {
    throw new Error('useRouter must be used inside <Router>');
  }
  return value;
}

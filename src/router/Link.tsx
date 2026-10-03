import type { ComponentPropsWithoutRef, MouseEvent } from 'react';
import { useRouter } from './routerContext';

export type LinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  to: string;
};

/**
 * Anchor that navigates without a full page reload, while keeping normal link
 * behaviour: middle click, ctrl/cmd click and "open in new tab" still work.
 */
export function Link({ to, onClick, target, ...rest }: LinkProps) {
  const { navigate } = useRouter();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (target !== undefined && target !== '_self')
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
  }

  return <a {...rest} href={to} target={target} onClick={handleClick} />;
}

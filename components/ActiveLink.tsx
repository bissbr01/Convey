import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type ActiveLinkProps = LinkProps & {
  className?: string;
  activeClassName: string;
};

const ActiveLink = ({
  children,
  activeClassName,
  className,
  ...props
}: PropsWithChildren<ActiveLinkProps>) => {
  const pathname = usePathname();
  // `as` is the displayed path when set. Compare pathnames only: no query, no hash.
  const target = props.as || props.href;
  const href = typeof target === 'string' ? target : target.pathname;
  const linkPathname = new URL(href || '/', 'http://localhost').pathname;
  const computedClassName =
    linkPathname === pathname
      ? `${className ?? ''} ${activeClassName}`.trim()
      : className;

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;

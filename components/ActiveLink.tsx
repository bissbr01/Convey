import { useRouter } from 'next/compat/router';
import Link, { LinkProps } from 'next/link';
import React, { PropsWithChildren, useState, useEffect } from 'react';

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
  const router = useRouter();
  const asPath = router?.asPath;
  const isReady = router?.isReady;
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    // next/compat/router is null on app routes: the Pages Router is not mounted.
    if (isReady && asPath != null) {
      // Dynamic route will be matched via props.as
      // Static route will be matched via props.href
      const linkPathname = new URL(
        (props.as || props.href) as string,
        location.href
      ).pathname;

      // Using URL().pathname to get rid of query and hash
      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim()
          : className;

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
};

export default ActiveLink;

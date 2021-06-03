import { ReactNode } from "react";
import Head from "next/head";

const Layout = ({
  children,
  title,
  description,
  theme,
}: {
  children: ReactNode;
  title: string;
  description: string;
  theme: string;
}) => {
  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme} />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style>{".home-page-no-cursor {cursor: auto !important;}"}</style>
        </noscript>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;

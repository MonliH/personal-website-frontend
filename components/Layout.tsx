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
        <link rel="apple-touch-icon" href="apple-touch-icon.png"></link>
        <link href="/favicon.ico" rel="icon" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;

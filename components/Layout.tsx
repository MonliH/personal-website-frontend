import { ReactNode } from "react";
import Head from "next/head";

const Layout = ({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;

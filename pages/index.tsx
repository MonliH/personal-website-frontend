import Head from "next/head";

import Layout from "@components/Layout";
import HomePage from "@components/home/Home";
import theme from "@styles/theme";

const Home = () => {
  return (
    <Layout
      title="Jonathan Li"
      description="Jonathan's personal website."
      theme={theme.colors.darkerBg}
    >
      <Head>
        <link
          rel="preload"
          href="fonts/MonumentExtended-Ultrabold-stripped.otf"
          as="font"
          crossOrigin="anonymous"
        />
      </Head>
      <HomePage />
    </Layout>
  );
};

export default Home;

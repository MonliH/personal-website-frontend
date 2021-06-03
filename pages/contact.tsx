import Layout from "@components/Layout";
import Contact from "@components/home/Contact";
import theme from "@styles/theme";

const Home = () => {
  return (
    <Layout
      title="Jonathan Li"
      description="Jonathan Li's personal website -- Let's get in touch!"
      theme={theme.colors.darkerBg}
    >
      <Contact />
    </Layout>
  );
};

export default Home;

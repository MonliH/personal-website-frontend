import Layout from "@components/Layout";
import HomePage from "@components/home/Home";
import theme from "@styles/theme";

const Home = () => {
  return (
    <Layout
      title="Jonathan Li"
      description="Jonathan's personal website."
      theme={theme.colors.darkBg}
    >
      <HomePage />
    </Layout>
  );
};

export default Home;

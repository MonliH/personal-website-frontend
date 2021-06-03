import Layout from "@components/Layout";
import Err from "@components/Error";
import theme from "@styles/theme";

export default function Home() {
  return (
    <Layout
      title="Jonathan Li"
      description="Jonathan's personal website."
      theme={theme.colors.darkerBg}
    >
      <Err />
    </Layout>
  );
}

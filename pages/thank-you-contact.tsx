import Layout from "@components/Layout";
import ThankYouContact from "@components/ThankYou";
import theme from "@styles/theme";

const ThankYou = () => {
  return (
    <Layout
      title="Thank you!"
      description="Thank you for contacting me (Jonathan Li)!"
      theme={theme.lightBg}
    >
      <ThankYouContact />
    </Layout>
  );
};
export default ThankYou;

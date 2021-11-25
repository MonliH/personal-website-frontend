import Layout from "@components/Layout";
import SignIn from "@components/admin/SignIn";
import theme from "@styles/theme";

const SignInPage = () => {
  return (
    <Layout
      title="Sign Into Admin"
      description="Sign into admin panel"
      theme={theme.colors.darkerBg}
    >
      <SignIn />
    </Layout>
  );
};

export default SignInPage;

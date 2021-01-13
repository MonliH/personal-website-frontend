import { useRouter } from "next/router";

import Layout from "@components/Layout";
import DeletePost from "@components/admin/DeletePost";
import { withProtect } from "@contexts/auth_context";

import theme from "@styles/theme";

const DeletePage = () => {
  const router = useRouter();
  const { blog_url } = router.query;

  return (
    <Layout
      title="Delete Page"
      description="Delete page on admin panel."
      theme={theme.lightBg}
    >
      <DeletePost blog_name={blog_url as string} />
    </Layout>
  );
};

export default withProtect(DeletePage);

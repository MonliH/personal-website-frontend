import { useRouter } from "next/router";

import Layout from "@components/Layout";
import EditPost from "@components/admin/EditPost";
import { withProtect } from "@contexts/auth_context";

import theme from "@styles/theme";

const EditBlog = () => {
  const router = useRouter();
  const { blog_url } = router.query;

  return (
    <Layout title="Edit a blog" description="Edit a blog" theme={theme.lightBg}>
      <EditPost blog_path={blog_url as string} />
    </Layout>
  );
};

export default withProtect(EditBlog);

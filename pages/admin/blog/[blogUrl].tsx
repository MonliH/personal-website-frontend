import { useRouter } from "next/router";

import Layout from "@components/Layout";
import EditPost from "@components/admin/EditPost";
import { withProtect } from "@contexts/authContext";

import theme from "@styles/theme";

const EditBlog = () => {
  const router = useRouter();
  const { blogUrl } = router.query;

  return (
    <Layout title="Edit a blog" description="Edit a blog" theme={theme.lightBg}>
      <EditPost blogPath={blogUrl as string} />
    </Layout>
  );
};

export default withProtect(EditBlog);

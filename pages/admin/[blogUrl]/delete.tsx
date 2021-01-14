import { useRouter } from "next/router";

import Layout from "@components/Layout";
import DeletePost from "@components/admin/DeletePost";
import { withProtect } from "@contexts/authContext";

import theme from "@styles/theme";

const DeletePage = () => {
  const router = useRouter();
  const { blogUrl } = router.query;

  return (
    <Layout
      title="Delete Page"
      description="Delete page on admin panel."
      theme={theme.lightBg}
    >
      <DeletePost blogName={blogUrl as string} />
    </Layout>
  );
};

export default withProtect(DeletePage);

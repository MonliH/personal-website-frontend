import { useRouter } from "next/router";

import Layout from "@components/Layout";
import DeleteResource from "@components/admin/DeleteResource";
import { useAuth, withProtect } from "@contexts/authContext";

import deletePost from "@lib/blog_api/deletePost";

import theme from "@styles/theme";

const DeletePage = () => {
  const router = useRouter();
  const { blogUrl } = router.query;
  const { auth } = useAuth();

  return (
    <Layout
      title="Delete Page"
      description="Delete page on admin panel."
      theme={theme.colors.lightBg}
    >
      <DeleteResource
        resourceName={blogUrl as string}
        deleteCallback={async () => {
          if (auth.key) {
            await deletePost(auth.key, blogUrl as string);
          }
        }}
        redirectUrl={`/admin/blog/${blogUrl}`}
      />
    </Layout>
  );
};

export default withProtect(DeletePage);

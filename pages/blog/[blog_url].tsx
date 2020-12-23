import { useRouter } from "next/router";

import Layout from "@components/Layout";
import BlogPage from "@components/blog/BlogPage";
import useBg from "@hooks/useBg";
import { withProtect } from "@contexts/auth_context";

const Post = () => {
  useBg("#FFFFFF");

  const router = useRouter();
  const { blog_url } = router.query;

  return (
    <Layout title="Jonathan Li's Blog" description="Blog">
      <BlogPage blog_url={blog_url as string} />
    </Layout>
  );
};

export default withProtect(Post);

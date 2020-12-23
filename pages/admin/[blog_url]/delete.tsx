import { useRouter } from "next/router";

import Layout from "@components/Layout";
import DeletePost from "@components/admin/DeletePost";

const DeletePage = () => {
  const router = useRouter();
  const { blog_url } = router.query;

  return (
    <Layout title="Delete Page" description="Delete page on admin panel.">
      <DeletePost blog_name={blog_url as string} />
    </Layout>
  );
}
export default DeletePage;

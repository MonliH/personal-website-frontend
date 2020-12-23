import Layout from "@components/Layout";
import BlogPageChanger from "@components/blog/BlogPageChanger";
import Panel from "@components/admin/Panel";
import useBlogEntries from "@hooks/useBlogEntries";
import { posts_per_page } from "@pages/blog";
import { withProtect } from "@contexts/auth_context";

const Admin = () => {
  const [pages, page_no, set_page_no, blog_entries, loading] = useBlogEntries(
    posts_per_page
  );

  return (
    <Layout
      title="Admin Panel"
      description="Jonathan's personal website admin panel."
    >
      <BlogPageChanger
        current_page={page_no}
        set_page={set_page_no}
        total_pages={pages}
      />
      <Panel loading={loading} blog_entries={blog_entries} />
    </Layout>
  );
};

export default withProtect(Admin);

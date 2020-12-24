import styled from "styled-components";
import { animated } from "react-spring";

import Layout from "@components/Layout";
import BlogPageChanger from "@components/blog/BlogPageChanger";
import Panel from "@components/admin/Panel";
import useBlogEntries from "@hooks/useBlogEntries";
import { posts_per_page } from "@pages/blog/[page_no]";
import { withProtect } from "@contexts/auth_context";

const BlogPageButton = styled(animated.button)`
  color: #15a1ff;
  text-decoration: underline;
  text-decoration-color: rgba(21, 161, 255, 0);
  background: none;
  border: none;
  font: inherit;
`;

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
        CustomSetter={({ style, onMouseEnter, onMouseLeave, page_no }) => (
          <BlogPageButton
            onClick={() => set_page_no(page_no)}
            style={style as any} // Bug in react spring
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
          >
            {page_no}
          </BlogPageButton>
        )}
        total_pages={pages}
      />
      <Panel loading={loading} blog_entries={blog_entries} />
    </Layout>
  );
};

export default withProtect(Admin);

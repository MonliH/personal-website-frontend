import styled from "styled-components";

import Layout from "@components/Layout";
import BlogPageChanger from "@components/blog/BlogPageChanger";
import Panel from "@components/admin/Panel";
import useBlogEntries from "@hooks/useBlogEntries";
import { postsPerPage } from "@pages/blog/[pageNo]";
import { withProtect } from "@contexts/authContext";
import theme from "@styles/theme";

const BlogPageButton = styled.button`
  color: #15a1ff;
  text-decoration: underline;
  text-decoration-color: rgba(21, 161, 255, 0);
  background: none;
  border: none;
  font: inherit;
`;

const Admin = () => {
  const [pages, pageNo, setPageNo, blogEntries, loading] = useBlogEntries(
    postsPerPage
  );

  return (
    <Layout
      title="Admin Panel"
      description="Jonathan's personal website admin panel."
      theme={theme.lightBg}
    >
      <BlogPageChanger
        current_page={pageNo + 1}
        CustomSetter={({ style, pageNo: page_no }) => (
          <BlogPageButton
            onClick={() => setPageNo(page_no - 1)}
            style={style}
          >
            {page_no}
          </BlogPageButton>
        )}
        totalPages={pages}
      />
      <Panel loading={loading} blogEntries={blogEntries} />
    </Layout>
  );
};

export default withProtect(Admin);

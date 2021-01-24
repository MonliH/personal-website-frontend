import { ReactNode } from "react";
import styled from "styled-components";

import { DashboardMargin } from "@components/admin/Panel";
import { SubTitle } from "@components/Title";
import Loading from "@components/Loading";
import { BlogSummaryList } from "@components/blog/BlogHome";
import { Button } from "@components/Inputs";

import { BlogEntryPreview } from "@lib/blog_api/blog";
import redirect from "@lib/redirect";

export interface BlogDashboardProps {
  blogLoading: boolean;
  blogEntries: Array<BlogEntryPreview>;
  children: ReactNode;
}

const FixedDiv = styled.div`
  width: fit-content;
`;

const BlogsDashboard = ({
  blogEntries,
  blogLoading,
  children,
}: BlogDashboardProps) => {
  const newBlog = () => {
    redirect("/admin/new");
  };
  return (
    <DashboardMargin>
      <SubTitle>Blog Entries</SubTitle>
      <Button onClick={newBlog}>New Post</Button>
      {children}
      {blogLoading ? (
        <Loading />
      ) : (
        <FixedDiv>
          <BlogSummaryList blogEntries={blogEntries} prefix="/admin/blog/" />
        </FixedDiv>
      )}
    </DashboardMargin>
  );
};
export default BlogsDashboard;

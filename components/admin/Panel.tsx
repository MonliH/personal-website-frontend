import styled from "styled-components";

import Loading from "@components/Loading";
import { BlogSummaryList } from "@components/blog/BlogHome";

import { useAuth } from "@contexts/authContext";

import { BlogEntryPreview } from "@lib/blog";
import redirect from "@lib/redirect";

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
`;

const SubTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
`;

const PanelButton = styled.button``;

interface PanelProps {
  loading: boolean;
  blogEntries: Array<BlogEntryPreview>;
}

const Panel = (p: PanelProps) => {
  const { setAuthData } = useAuth();

  const onLogOut = () => {
    setAuthData!(undefined);
  };

  const newBlog = () => {
    redirect("/admin/new");
  };

  return (
    <>
      <Title>Admin Panel</Title>
      <PanelButton onClick={onLogOut}>Log Out</PanelButton>
      <SubTitle>Blogs</SubTitle>
      <PanelButton onClick={newBlog}>New Post</PanelButton>
      {p.loading ? (
        <Loading />
      ) : (
        <BlogSummaryList blogEntries={p.blogEntries} prefix="/admin/blog/" />
      )}
    </>
  );
};

export default Panel;

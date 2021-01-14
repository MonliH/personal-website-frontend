import styled from "styled-components";

import { useAuth } from "@contexts/authContext";
import { BlogEntry } from "@lib/blog";
import redirect from "@lib/redirect";
import Loading from "@components/Loading";
import { BlogSummaryList } from "@components/blog/BlogHome";

const Title = styled.div`
  color: black;
`;

const SubTitle = styled.div`
  color: black;
`;

const PanelButton = styled.button``;

interface PanelProps {
  loading: boolean;
  blogEntries: Array<BlogEntry>;
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
    <div>
      <Title>Admin Panel</Title>
      <PanelButton onClick={onLogOut}>Log Out</PanelButton>
      <SubTitle>Blogs</SubTitle>
      <PanelButton onClick={newBlog}>New Post</PanelButton>
      {p.loading ? (
        <Loading />
      ) : (
        <BlogSummaryList blogEntries={p.blogEntries} prefix="/admin/blog/" />
      )}
    </div>
  );
};

export default Panel;

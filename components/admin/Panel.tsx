import styled from "styled-components";

import { useAuth } from "@contexts/auth_context";
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
  blog_entries: Array<BlogEntry>;
}

const Panel = (p: PanelProps) => {
  const { set_auth_data } = useAuth();

  const on_log_out = () => {
    set_auth_data!(undefined);
  };

  const new_blog = () => {
    redirect("/admin/new");
  };

  return (
    <div>
      <Title>Admin Panel</Title>
      <PanelButton onClick={on_log_out}>Log Out</PanelButton>
      <SubTitle>Blogs</SubTitle>
      <PanelButton onClick={new_blog}>New Post</PanelButton>
      {p.loading ? (
        <Loading />
      ) : (
        <BlogSummaryList blog_entries={p.blog_entries} prefix="/admin/blog/" />
      )}
    </div>
  );
};

export default Panel;

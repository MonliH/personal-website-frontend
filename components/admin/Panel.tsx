import Router from "next/router";
import { useContext } from "react";

import styled from "styled-components";

import { auth_context } from "@contexts/auth_context";
import { BlogSummaryList } from "@components/blog/BlogHome";

import Loading from "@components/Loading";
import { BlogEntry } from "@data/blog";

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
  const { set_auth_data } = useContext(auth_context);

  const on_log_out = () => {
    set_auth_data!(undefined);
  };

  const new_blog = () => {
    Router.replace("/admin/new");
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
        <BlogSummaryList blog_entries={p.blog_entries} prefix={Router.pathname} />
      )}
    </div>
  );
};

export default Panel;

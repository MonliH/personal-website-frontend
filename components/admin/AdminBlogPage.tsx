import { ComponentType, useEffect, useState } from "react";

import Router from "next/router";
import dynamic from "next/dynamic";

import styled from "styled-components";
import { IAceEditorProps } from "react-ace";

const AceEditor: ComponentType<IAceEditorProps> = dynamic(
  async () => {
    const ace = await require("react-ace");
    require("ace-builds/src-noconflict/keybinding-vim");
    require("ace-builds/src-noconflict/theme-tomorrow");
    require("ace-builds/src-noconflict/mode-markdown");
    return ace;
  },
  { ssr: false }
);

import Loading from "@components/Loading";
import StyledLink from "@components/StyledLink";

import { useAuth } from "@contexts/authContext";

import { BlogEntry } from "@lib/blog";
import { formatDate } from "@lib/date";
import changePost from "@lib/changePost";

const ChangeBlogForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ChangeBlogLabel = styled.label`
  color: black;
`;

const AdminBlogPage = ({
  blog,
  showUrl,
}: {
  blog: BlogEntry;
  showUrl?: boolean;
}) => {
  const [revisedBlog, setRevisedBlog] = useState<null | BlogEntry>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [message, setMessage] = useState("");

  const { auth } = useAuth();

  useEffect(() => {
    setIsAuthed(true);
  }, [auth]);

  useEffect(() => {
    setRevisedBlog(blog);
  }, [blog]);

  const on_form_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.key) {
      let ok = await changePost(auth.key, revisedBlog!);
      if (ok) {
        setMessage("Blog changed");
      } else {
        setMessage("Failed to change blog");
      }
    } else {
      setIsAuthed(false);
    }
  };

  if (!isAuthed) {
    return <Loading />;
  } else {
    if (blog && revisedBlog) {
      return (
        <div>
          <StyledLink link="/admin/" text="Admin Panel" />
          <button
            onClick={() => {
              Router.replace(`/admin/${Router.query.blogUrl}/delete`);
            }}
          >
            DELETE
          </button>
          <ChangeBlogForm onSubmit={on_form_submit}>
            <ChangeBlogLabel>Title</ChangeBlogLabel>
            <input
              type="text"
              value={revisedBlog.title}
              onChange={(e: React.FormEvent) => {
                setRevisedBlog({
                  ...revisedBlog,
                  title: (e.target as HTMLInputElement).value,
                } as BlogEntry);
              }}
            />
            <ChangeBlogLabel>Date</ChangeBlogLabel>
            <input
              type="date"
              value={formatDate(revisedBlog.date)}
              onChange={(e: React.FormEvent) => {
                setRevisedBlog({
                  ...revisedBlog,
                  date: new Date((e.target as HTMLInputElement).value),
                });
              }}
            />
            {showUrl ? (
              <>
                <ChangeBlogLabel>URL</ChangeBlogLabel>
                <input
                  type="text"
                  value={revisedBlog.url}
                  onChange={(e: React.FormEvent) => {
                    setRevisedBlog({
                      ...revisedBlog,
                      url: (e.target as HTMLInputElement).value,
                    } as BlogEntry);
                  }}
                />
              </>
            ) : (
              <></>
            )}
            <ChangeBlogLabel>Markdown</ChangeBlogLabel>
            <AceEditor
              mode="markdown"
              theme="tomorrow"
              value={revisedBlog.md_contents}
              onChange={(md_contents: string) => {
                setRevisedBlog({
                  ...revisedBlog,
                  md_contents,
                } as BlogEntry);
              }}
              keyboardHandler="vim"
              width="50vw"
              fontSize={16}
            />
            <input type="submit" value="Change" />
            <ChangeBlogLabel>{message}</ChangeBlogLabel>
          </ChangeBlogForm>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
};

export default AdminBlogPage;

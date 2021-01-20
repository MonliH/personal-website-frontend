import Link from "next/link";
import { FormEvent, ComponentType, useEffect, useState } from "react";

import Router from "next/router";
import dynamic from "next/dynamic";

import styled from "styled-components";
import { IAceEditorProps } from "react-ace";

import Loading from "@components/Loading";
import Bg from "@components/Bg";

import { useAuth } from "@contexts/authContext";

import { BlogEntryAdmin } from "@lib/blog";
import changePost from "@lib/upsertPost";

import theme from "@styles/theme";

const AceEditor: ComponentType<IAceEditorProps> = dynamic(
  async () => {
    const ace = await import("react-ace");
    /* eslint-disable */
    require("ace-builds/src-noconflict/keybinding-vim");
    require("ace-builds/src-noconflict/theme-monokai");
    require("ace-builds/src-noconflict/mode-markdown");
    require("ace-builds/src-noconflict/keybinding-vim");
    /* eslint-enable */
    return ace;
  },
  { ssr: false }
);

const ChangeBlogForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ChangeBlogLabel = styled.label`
  font-size: 20px;
`;

const AdminPanelWrapper = styled.div`
  font-family: ${({ theme: t }) => t.fonts.sansSerif};
`;

const AdminBlogPage = ({
  blog,
  showUrl = false,
}: {
  blog: BlogEntryAdmin;
  showUrl?: boolean;
}) => {
  const [revisedBlog, setRevisedBlog] = useState<null | BlogEntryAdmin>(null);
  const [isAuthed, setIsAuthed] = useState(false);
  const [message, setMessage] = useState("");

  const { auth } = useAuth();

  useEffect(() => {
    setIsAuthed(true);
  }, [auth]);

  useEffect(() => {
    setRevisedBlog(blog);
  }, [blog]);

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (auth.key) {
      const ok = await changePost(auth.key, revisedBlog!);
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
  }
  if (blog && revisedBlog) {
    return (
      <Bg altColor>
        <AdminPanelWrapper>
          <Link href="/admin/" passHref>
            <a>Admin Panel</a>
          </Link>
          <button
            type="button"
            onClick={() => {
              Router.replace(`/admin/${Router.query.blogUrl}/delete`);
            }}
          >
            DELETE
          </button>
          <ChangeBlogForm onSubmit={onFormSubmit}>
            <ChangeBlogLabel>Title</ChangeBlogLabel>
            <input
              type="text"
              value={revisedBlog.title}
              onChange={(e: FormEvent) => {
                setRevisedBlog({
                  ...revisedBlog,
                  title: (e.target as HTMLInputElement).value,
                } as BlogEntryAdmin);
              }}
            />
            <ChangeBlogLabel>Date</ChangeBlogLabel>
            <input
              type="date"
              value={revisedBlog.date.toISOString().split("T")[0]}
              onChange={(e: FormEvent) => {
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
                  onChange={(e: FormEvent) => {
                    setRevisedBlog({
                      ...revisedBlog,
                      url: (e.target as HTMLInputElement).value,
                    } as BlogEntryAdmin);
                  }}
                />
              </>
            ) : (
              <></>
            )}
            <ChangeBlogLabel>Markdown</ChangeBlogLabel>
            <AceEditor
              mode="markdown"
              theme="monokai"
              style={{ fontFamily: theme.fonts.monospace }}
              value={revisedBlog.mdContents}
              onChange={(mdContents: string) => {
                setRevisedBlog({
                  ...revisedBlog,
                  mdContents,
                } as BlogEntryAdmin);
              }}
              keyboardHandler="vim"
              width="100%"
              height="80vh"
              fontSize={16}
            />
            <input type="submit" value="Change" />
            <ChangeBlogLabel>{message}</ChangeBlogLabel>
          </ChangeBlogForm>
        </AdminPanelWrapper>
      </Bg>
    );
  }
  return <Loading />;
};

export default AdminBlogPage;

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

import { useAuth } from "@contexts/auth_context";

import { BlogEntry } from "@lib/blog";
import { from_unix_timestamp, to_unix_timestamp, format_date } from "@lib/date";
import change_post from "@lib/change_post";

const ChangeBlogForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ChangeBlogLabel = styled.label`
  color: black;
`;

const AdminBlogPage = ({
  blog,
  show_url,
}: {
  blog: BlogEntry;
  show_url?: boolean;
}) => {
  const [revised_blog, set_revised_blog] = useState<null | BlogEntry>(null);
  const [is_authed, set_is_authed] = useState(false);
  const [message, set_message] = useState("");

  const { auth } = useAuth();

  useEffect(() => {
    set_is_authed(true);
  }, [auth]);

  useEffect(() => {
    set_revised_blog(blog);
  }, [blog]);

  const on_form_submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.key) {
      let ok = await change_post(auth.key, revised_blog!);
      if (ok) {
        set_message("Blog changed");
      } else {
        set_message("Failed to change blog");
      }
    } else {
      set_is_authed(false);
    }
  };
  console.log(revised_blog);

  if (!is_authed) {
    return <Loading />;
  } else {
    if (blog && revised_blog) {
      return (
        <div>
          <StyledLink link="/admin/" text="Admin Panel" />
          <button
            onClick={() => {
              Router.push("/delete");
            }}
          >
            DELETE
          </button>
          <ChangeBlogForm onSubmit={on_form_submit}>
            <ChangeBlogLabel>Title</ChangeBlogLabel>
            <input
              type="text"
              value={revised_blog.title}
              onChange={(e: React.FormEvent) => {
                set_revised_blog({
                  ...revised_blog,
                  title: (e.target as HTMLInputElement).value,
                } as BlogEntry);
              }}
            />
            <ChangeBlogLabel>Date</ChangeBlogLabel>
            <input
              type="date"
              value={format_date(revised_blog.date)}
              onChange={(e: React.FormEvent) => {
                set_revised_blog({
                  ...revised_blog,
                  date: new Date((e.target as HTMLInputElement).value),
                });
              }}
            />
            {show_url ? (
              <>
                <ChangeBlogLabel>URL</ChangeBlogLabel>
                <input
                  type="text"
                  value={revised_blog.url}
                  onChange={(e: React.FormEvent) => {
                    set_revised_blog({
                      ...revised_blog,
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
              value={revised_blog.md_contents}
              onChange={(md_contents: string) => {
                set_revised_blog({
                  ...revised_blog,
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

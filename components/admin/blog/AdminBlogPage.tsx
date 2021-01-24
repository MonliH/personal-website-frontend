import { FormEvent, ComponentType, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import styled from "styled-components";
import { IAceEditorProps } from "react-ace";

import Loading from "@components/Loading";
import Bg from "@components/Bg";
import { Button, RedButton, InputWrapper, Input } from "@components/Inputs";
import { WrapperHorizontalCenterRow } from "@components/Wrapper";
import AdminPanelLink from "@components/admin/AdminPanelLink";

import { useAuth } from "@contexts/authContext";

import { BlogEntryAdmin } from "@lib/blog_api/blog";
import changePost from "@lib/blog_api/upsertPost";
import redirect from "@lib/redirect";

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

const ChangeBlogLabel = styled.label`
  font-size: 20px;
`;

const AdminPanelWrapper = styled.div`
  font-family: ${({ theme: t }) => t.fonts.sansSerif};
  margin-top: 20px;
  margin-left: 20px;
`;

const AdminBlogPage = ({
  blog,
  showUrl = false,
}: {
  blog: BlogEntryAdmin;
  showUrl?: boolean;
}) => {
  const [revisedBlog, setRevisedBlog] = useState<null | BlogEntryAdmin>(null);
  const [message, setMessage] = useState("");

  const { auth } = useAuth();

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
    }
  };

  if (blog && revisedBlog) {
    return (
      <Bg altColor>
        <AdminPanelWrapper>
          <AdminPanelLink />
          <form onSubmit={onFormSubmit}>
            <Button as="input" type="submit" value="Apply Changes" />
            <RedButton
              type="button"
              onClick={() => {
                redirect(`/admin/blog/${blog.url}/delete`);
              }}
            >
              DELETE THIS POST
            </RedButton>
            <ChangeBlogLabel>{message}</ChangeBlogLabel>
            <WrapperHorizontalCenterRow>
              <InputWrapper>
                <ChangeBlogLabel>Title</ChangeBlogLabel>
                <Input
                  type="text"
                  value={revisedBlog.title}
                  onChange={(e: FormEvent) => {
                    setRevisedBlog({
                      ...revisedBlog,
                      title: (e.target as HTMLInputElement).value,
                    } as BlogEntryAdmin);
                  }}
                />
              </InputWrapper>
              <InputWrapper>
                <ChangeBlogLabel>Date</ChangeBlogLabel>
                <Input
                  type="date"
                  value={revisedBlog.date.toISOString().split("T")[0]}
                  onChange={(e: FormEvent) => {
                    setRevisedBlog({
                      ...revisedBlog,
                      date: new Date((e.target as HTMLInputElement).value),
                    });
                  }}
                />
              </InputWrapper>
              {showUrl ? (
                <InputWrapper>
                  <ChangeBlogLabel>URL</ChangeBlogLabel>
                  <Input
                    type="text"
                    value={revisedBlog.url}
                    onChange={(e: FormEvent) => {
                      setRevisedBlog({
                        ...revisedBlog,
                        url: (e.target as HTMLInputElement).value,
                      } as BlogEntryAdmin);
                    }}
                  />
                </InputWrapper>
              ) : (
                <></>
              )}
            </WrapperHorizontalCenterRow>
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
              width="calc(100% - 20px)"
              height="80vh"
              fontSize={16}
            />
          </form>
        </AdminPanelWrapper>
      </Bg>
    );
  }
  return <Loading />;
};

export default AdminBlogPage;

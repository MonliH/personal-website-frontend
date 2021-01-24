import { Dispatch, useReducer } from "react";
import styled from "styled-components";

import Layout from "@components/Layout";
import PageChanger from "@components/PageChanger";
import Panel from "@components/admin/Panel";
import Bg from "@components/Bg";

import usePaged from "@hooks/usePaged";
import { postsPerPage as blogPostsPerPage } from "@pages/blog/[pageNo]";
import { withProtect, useAuth } from "@contexts/authContext";
import { BlogEntryPreview } from "@lib/blog_api/blog";
import { getPreviewPage } from "@lib/blog_api/fetchBlog";
import Contact from "@lib/contact_api/form";
import { getContactsPage } from "@lib/contact_api/fetchContacts";
import pagedReducer, {
  PAGED_INITAL_STATE,
  PagedAction,
  PagedState,
  PagedActionTypes,
} from "@reducers/pagedReducer";

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
  const { auth } = useAuth();
  const [blogState, blogDispatch] = useReducer(
    pagedReducer,
    PAGED_INITAL_STATE
  ) as [PagedState<BlogEntryPreview>, Dispatch<PagedAction<BlogEntryPreview>>];

  usePaged(blogPostsPerPage, blogState.pageNo, blogDispatch, getPreviewPage);

  const [contactState, contactDispatch] = useReducer(
    pagedReducer,
    PAGED_INITAL_STATE
  ) as [PagedState<Contact>, Dispatch<PagedAction<Contact>>];

  usePaged(blogPostsPerPage, contactState.pageNo, contactDispatch, (...args) =>
    getContactsPage(auth.key, ...args)
  );

  return (
    <Layout
      title="Admin Panel"
      description="Jonathan's personal website admin panel."
      theme={theme.colors.lightBg}
    >
      <Bg altColor>
        <Panel
          blogLoading={blogState.loading}
          contactsLoading={contactState.loading}
          blogEntries={blogState.entries}
          contacts={contactState.entries}
        >
          <PageChanger
            currentPage={blogState.pageNo + 1}
            CustomSetter={({ style, pageNo: newPageNo }) => (
              <BlogPageButton
                onClick={() =>
                  blogDispatch({
                    type: PagedActionTypes.SET_PAGE_NO,
                    pageNo: newPageNo - 1,
                  })
                }
                style={style}
              >
                {newPageNo}
              </BlogPageButton>
            )}
            totalPages={blogState.pages}
          />
        </Panel>
      </Bg>
    </Layout>
  );
};

export default withProtect(Admin);

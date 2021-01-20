import {
  BlogEntryPreview,
  intoBlogEntryPreview,
  BlogEntryDisplay,
  intoBlogEntryDisplay,
  BlogEntryAdmin,
  intoBlogEntryAdmin,
} from "@lib/blog";
import API_DOMAIN from "@lib/API_DOMAIN";

export const getNumPosts = async (): Promise<number> => {
  const blogPostsNum = parseInt(
    await (await fetch(`${API_DOMAIN}/blog/pages`)).text(),
    10
  );
  return blogPostsNum;
};

export const getAllUrls = async (): Promise<Array<string>> => {
  const entriesRes = await fetch(`${API_DOMAIN}/blog/all_urls`);
  const entries: Array<string> = JSON.parse(await entriesRes.text());

  return entries;
};

export const getRange = async (
  start: number,
  end: number
): Promise<Array<BlogEntryPreview>> => {
  const entriesRes = await fetch(`${API_DOMAIN}/blog/entries/${start}/${end}`);
  const entries: Array<BlogEntryPreview> = JSON.parse(
    await entriesRes.text()
  ).map((entry: any) => intoBlogEntryPreview(entry));
  return entries;
};

export const getPreviewPage = async (
  postsPerPage: number,
  pageNo: number
): Promise<[number, Array<BlogEntryPreview>]> => {
  const totalPostNums = await getNumPosts();
  const blogPagesNum = Math.ceil(totalPostNums / postsPerPage);
  const pageStart = postsPerPage * pageNo;
  const possibleEnd = pageStart + postsPerPage;
  const entries = await getRange(
    pageStart,
    possibleEnd > totalPostNums ? totalPostNums : possibleEnd
  );
  return [blogPagesNum, entries];
};

export const getBlogPostDisplay = async (
  blogUrl: string
): Promise<BlogEntryDisplay> => {
  const res = await fetch(`${API_DOMAIN}/blog/entry/display/${blogUrl}`);
  const text = await res.text();
  const blogContents = intoBlogEntryDisplay(JSON.parse(text));
  return blogContents;
};

export const getBlogPostAdmin = async (
  blogUrl: string
): Promise<BlogEntryAdmin> => {
  const res = await fetch(`${API_DOMAIN}/blog/entry/admin/${blogUrl}`);
  const blogContents = intoBlogEntryAdmin(JSON.parse(await res.text()));
  return blogContents;
};

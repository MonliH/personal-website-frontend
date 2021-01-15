import { BlogEntry, intoBlogEntry } from "@lib/blog";
import API_DOMAIN from "@lib/API_DOMAIN";

export const getNumPosts = async (): Promise<number> => {
  const blogPostsNum = parseInt(
    await (await fetch(`${API_DOMAIN}/blog/pages`)).text(),
    10
  );
  return blogPostsNum;
};

export const getAllUrls = async (): Promise<string[]> => {
  const entriesRes = await fetch(`${API_DOMAIN}/blog/all_urls`);
  const entries: string[] = JSON.parse(await entriesRes.text());

  return entries;
};

export const getRange = async (
  start: number,
  end: number
): Promise<BlogEntry[]> => {
  const entriesRes = await fetch(`${API_DOMAIN}/blog/entries/${start}/${end}`);
  const entries: BlogEntry[] = JSON.parse(
    await entriesRes.text()
  ).map((entry: any) => intoBlogEntry(entry));
  return entries;
};

export const getPreviewPage = async (
  postsPerPage: number,
  pageNo: number
): Promise<[number, BlogEntry[]]> => {
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

export const getBlogPost = async (blogUrl: string): Promise<BlogEntry> => {
  const res = await fetch(`${API_DOMAIN}/blog/entry/${blogUrl}`);
  const blogContents = intoBlogEntry(JSON.parse(await res.text()));
  return blogContents;
};

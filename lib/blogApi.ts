import { BlogEntry, intoBlogEntry } from "@lib/blog";
import { API_DOMAIN } from "@lib/domains";

export const getNumPosts = async (): Promise<number> => {
  const blogPostsNum = parseInt(
    await (await fetch(`${API_DOMAIN}/blog/pages`)).text()
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
  posts_per_page: number,
  page_no: number
): Promise<[number, BlogEntry[]]> => {
  const totalPostNums = await getNumPosts();
  const blogPagesNum = Math.ceil(totalPostNums / posts_per_page);
  const pageStart = posts_per_page * page_no;
  const possibleEnd = pageStart + posts_per_page;
  const entries = await getRange(
    pageStart,
    possibleEnd > totalPostNums ? totalPostNums : possibleEnd
  );
  return [blogPagesNum, entries];
};

export const getBlogPost = async (blog_url: string): Promise<BlogEntry> => {
  const res = await fetch(`${API_DOMAIN}/blog/entry/${blog_url}`);
  const blogContents = intoBlogEntry(JSON.parse(await res.text()));
  return blogContents;
};

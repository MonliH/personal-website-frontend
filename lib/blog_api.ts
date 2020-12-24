import { BlogEntry, into_blog_entry } from "@lib/blog";
import { API_DOMAIN } from "@lib/domains";

export const get_num_posts = async (): Promise<number> => {
  const blog_posts_num = parseInt(
    await (await fetch(`${API_DOMAIN}/api/blog/pages`)).text()
  );
  return blog_posts_num;
};

export const get_all_urls = async (): Promise<string[]> => {
  const entries_res = await fetch(`${API_DOMAIN}/api/blog/all_urls`);
  const entries: string[] = JSON.parse(await entries_res.text());

  return entries;
};

export const get_range = async (
  start: number,
  end: number
): Promise<BlogEntry[]> => {
  const entries_res = await fetch(
    `${API_DOMAIN}/api/blog/entries/${start}/${end}`
  );
  const entries: BlogEntry[] = JSON.parse(
    await entries_res.text()
  ).map((entry: any) => into_blog_entry(entry));
  return entries;
};

export const get_preview_page = async (
  posts_per_page: number,
  page_no: number
): Promise<[number, BlogEntry[]]> => {
  const total_post_nums = await get_num_posts();
  const blog_pages_num = Math.ceil(total_post_nums / posts_per_page);
  const page_start = posts_per_page * page_no;
  const possible_end = page_start + posts_per_page;
  const entries = await get_range(
    page_start,
    possible_end > total_post_nums ? total_post_nums : possible_end
  );
  return [blog_pages_num, entries];
};

export const get_blog_post = async (blog_url: string): Promise<BlogEntry> => {
  const res = await fetch(`${API_DOMAIN}/api/blog/entry/${blog_url}`);
  const blog_contents = into_blog_entry(JSON.parse(await res.text()));
  return blog_contents;
};

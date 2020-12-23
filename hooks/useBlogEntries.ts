import { API_DOMAIN } from "@lib/domains";

import { useState, useEffect } from "react";
import { BlogEntry, into_blog_entry } from "@lib/blog";

const useBlogEntries = (
  posts_per_page: number
): [number, number, (no: number) => void, Array<BlogEntry>, boolean] => {
  const [blog_entries, set_blog_entries] = useState<Array<BlogEntry>>([]);
  const [page_no, set_page_no] = useState(0);
  const [loading, set_loading] = useState(true);
  const [pages, set_pages] = useState(0);

  const fetch_entries = async () => {
    set_loading(true);
    const blog_pages_num = parseInt(
      await (await fetch(`${API_DOMAIN}/api/blog/pages`)).text()
    );
    set_pages(Math.ceil(blog_pages_num / posts_per_page));
    const page_start = posts_per_page * page_no;
    const possible_end = page_start + posts_per_page;
    const entries_res = await fetch(
      `${API_DOMAIN}/api/blog/entries/${page_start}/${
        possible_end > blog_pages_num ? blog_pages_num : possible_end
      }`
    );
    const entries: Array<BlogEntry> = JSON.parse(
      await entries_res.text()
    ).map((entry: any) => into_blog_entry(entry));
    set_blog_entries(entries);
    set_loading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch_entries();
  }, [page_no, posts_per_page]);

  return [pages, page_no, set_page_no, blog_entries, loading];
};

export default useBlogEntries;

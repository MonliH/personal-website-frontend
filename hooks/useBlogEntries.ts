import { useState, useEffect } from "react";
import { BlogEntry } from "@lib/blog";
import { get_preview_page } from "@lib/blog_api";

const useBlogEntries = (
  posts_per_page: number
): [number, number, (no: number) => void, Array<BlogEntry>, boolean] => {
  const [blog_entries, set_blog_entries] = useState<Array<BlogEntry>>([]);
  const [page_no, set_page_no] = useState(0);
  const [loading, set_loading] = useState(true);
  const [pages, set_pages] = useState(0);

  const fetch_entries = async () => {
    set_loading(true);
    const [pages, entries] = await get_preview_page(posts_per_page, page_no);
    set_blog_entries(entries);
    set_pages(pages);
    set_loading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch_entries();
  }, [page_no, posts_per_page]);

  return [pages, page_no, set_page_no, blog_entries, loading];
};

export default useBlogEntries;

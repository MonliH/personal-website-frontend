import { useState, useEffect } from "react";
import { BlogEntry } from "@lib/blog";
import { getPreviewPage } from "@lib/blogApi";

const useBlogEntries = (
  posts_per_page: number
): [number, number, (no: number) => void, Array<BlogEntry>, boolean] => {
  const [blogEntries, setBlogEntries] = useState<Array<BlogEntry>>([]);
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(0);

  const fetch_entries = async () => {
    setLoading(true);
    const [pages, entries] = await getPreviewPage(posts_per_page, pageNo);
    setBlogEntries(entries);
    setPages(pages);
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetch_entries();
  }, [pageNo, posts_per_page]);

  return [pages, pageNo, setPageNo, blogEntries, loading];
};

export default useBlogEntries;

import { useState, useEffect } from "react";
import { BlogEntry } from "@lib/blog";
import { getPreviewPage } from "@lib/blogApi";

const useBlogEntries = (
  postsPerPage: number
): [number, number, (no: number) => void, Array<BlogEntry>, boolean] => {
  const [blogEntries, setBlogEntries] = useState<Array<BlogEntry>>([]);
  const [pageNo, setPageNo] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(0);

  const fetchEntries = async () => {
    setLoading(true);
    const [newPages, entries] = await getPreviewPage(postsPerPage, pageNo);
    setBlogEntries(entries);
    setPages(newPages);
    setLoading(false);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchEntries();
  }, [pageNo, postsPerPage]);

  return [pages, pageNo, setPageNo, blogEntries, loading];
};

export default useBlogEntries;

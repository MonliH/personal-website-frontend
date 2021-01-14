import { useState, useEffect } from "react";

import { BlogEntry } from "@lib/blog";
import { getBlogPost } from "@lib/blogApi";

const useBlogPost = (blogUrl: string): null | BlogEntry => {
  const [blog, setBlog] = useState<BlogEntry | null>(null);

  useEffect(() => {
    getBlogPost(blogUrl).then((post) => setBlog(post));
  }, []);

  return blog;
};

export default useBlogPost;

import { useState, useEffect } from "react";

import { BlogEntryAdmin } from "@lib/blog";
import { getBlogPostAdmin } from "@lib/fetchBlog";

const useBlogPost = (blogUrl: string): null | BlogEntryAdmin => {
  const [blog, setBlog] = useState<BlogEntryAdmin | null>(null);

  useEffect(() => {
    getBlogPostAdmin(blogUrl).then((post) => setBlog(post));
  }, []);

  return blog;
};

export default useBlogPost;

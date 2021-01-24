import { useState, useEffect } from "react";

import { BlogEntryAdmin } from "@lib/blog_api/blog";
import { getBlogPostAdmin } from "@lib/blog_api/fetchBlog";

const useBlogPostAdmin = (blogUrl: string): null | BlogEntryAdmin => {
  const [blog, setBlog] = useState<BlogEntryAdmin | null>(null);

  useEffect(() => {
    getBlogPostAdmin(blogUrl).then((post) => setBlog(post));
  }, []);

  return blog;
};

export default useBlogPostAdmin;

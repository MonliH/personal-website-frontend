import { useState, useEffect } from "react";

import { BlogEntry } from "@lib/blog";
import { get_blog_post } from "@lib/blog_api";

const useBlogPost = (blog_url: string): null | BlogEntry => {
  const [blog, set_blog] = useState<BlogEntry | null>(null);

  useEffect(() => {
    get_blog_post(blog_url).then((post) => set_blog(post));
  }, []);

  return blog;
};

export default useBlogPost;

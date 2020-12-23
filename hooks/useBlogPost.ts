import { API_DOMAIN } from "@lib/domains";

import { useState, useEffect } from "react";

import { into_blog_entry, BlogEntry } from "@lib/blog";

const useBlogPost = (blog_url: string): [null | BlogEntry, null | string] => {
  const [blog_404, set_blog_404] = useState<null | string>(null);
  const [blog, set_blog] = useState<BlogEntry | null>(null);

  const get_blog = async () => {
    fetch(`${API_DOMAIN}/api/blog/entry/${blog_url}`)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(new Error("cannot find specified blog page"));
        }
        return res.text();
      })
      .then((text) => set_blog(into_blog_entry(JSON.parse(text))))
      .catch((why: Error) => {
        set_blog_404(why.message);
      });
  };

  useEffect(() => {
    get_blog();
  }, []);

  return [blog, blog_404];
};

export default useBlogPost;

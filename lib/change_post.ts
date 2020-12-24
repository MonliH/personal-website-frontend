import { API_DOMAIN } from "@lib/domains";
import { BlogEntry } from "@lib/blog";
import { format_date, from_unix_timestamp } from "@lib/date";
import hljs from "highlight.js";

import { Remarkable } from "remarkable";

let md = new Remarkable({
  typographer: true,
  html: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ""; // use external default escaping
  },
});

const change_post = async (key: string, new_post: BlogEntry) => {
  const request_options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
      blog: {
        ...new_post,
        html_contents: md.render(new_post.md_contents),
        date: format_date(from_unix_timestamp(new_post.date)),
      },
    }),
  };

  const res = await fetch(`${API_DOMAIN}/api/admin/edit`, request_options);

  return res.ok;
};

export default change_post;

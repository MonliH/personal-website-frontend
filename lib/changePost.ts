import hljs from "highlight.js";
import { Remarkable } from "remarkable";

import API_DOMAIN from "@lib/API_DOMAIN";
import { BlogEntry, intoServerEntry } from "@lib/blog";
import { formatDate } from "@lib/date";

const md = new Remarkable({
  typographer: true,
  html: true,
  // We can disable next-line lint because all of the paths return
  // eslint-disable-next-line consistent-return
  highlight(str: string, lang: string) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str).value;
      }
    } catch {
      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {
        return ""; // use external default escaping
      }
    }
  },
});

const changePost = async (key: string, newPost: BlogEntry) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify({
      ...intoServerEntry({
        ...newPost,
        htmlContents: md.render(newPost.mdContents),
      }),
      date: formatDate(newPost.date),
    }),
  };

  const res = await fetch(`${API_DOMAIN}/admin/edit`, requestOptions);

  return res.ok;
};

export default changePost;

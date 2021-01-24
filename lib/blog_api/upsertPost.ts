import API_DOMAIN from "@lib/API_DOMAIN";
import { BlogEntryAdmin, intoBlogEntryBackend } from "@lib/blog_api/blog";

const changePost = async (key: string, newPost: BlogEntryAdmin) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: key,
    },
    body: JSON.stringify({
      ...intoBlogEntryBackend(newPost),
      date: newPost.date.toISOString().split("T")[0],
    }),
  };

  const res = await fetch(`${API_DOMAIN}/admin/edit`, requestOptions);

  return res.ok;
};

export default changePost;

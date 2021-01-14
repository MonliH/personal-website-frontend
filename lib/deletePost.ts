import { API_DOMAIN } from "@lib/domains";

const deletePost = async (key: string, url: string) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
      url,
    }),
  };

  const res = await fetch(`${API_DOMAIN}/admin/delete`, requestOptions);

  return res.ok;
};

export default deletePost;

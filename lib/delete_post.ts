import { API_DOMAIN } from "@lib/domains";

const delete_post = async (key: string, url: string) => {
  const request_options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      key,
      url,
    }),
  };

  const res = await fetch(`${API_DOMAIN}/admin/delete`, request_options);

  return res.ok;
};

export default delete_post;

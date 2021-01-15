import { API_DOMAIN } from "@lib/domains";

const deletePost = async (key: string, url: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: key,
    },
  };

  const res = await fetch(`${API_DOMAIN}/admin/delete/${url}`, requestOptions);

  return res.ok;
};

export default deletePost;

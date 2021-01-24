import API_DOMAIN from "@lib/API_DOMAIN";

const deleteContact = async (key: string, id: string) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: key,
    },
  };

  const res = await fetch(
    `${API_DOMAIN}/admin/contact/delete/${id}`,
    requestOptions
  );

  return res.ok;
};

export default deleteContact;

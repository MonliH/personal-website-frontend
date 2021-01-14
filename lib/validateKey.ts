import { API_DOMAIN } from "@lib/domains";

const validate_key = async (key: string): Promise<boolean> => {
  const requestOptions = {
    method: "POST",
    body: key,
  };

  const isCorrect = await fetch(`${API_DOMAIN}/admin/key`, requestOptions);

  return isCorrect.ok;
};

export default validate_key;

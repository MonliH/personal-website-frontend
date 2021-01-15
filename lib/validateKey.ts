import { API_DOMAIN } from "@lib/domains";
import { encodePwd } from "@contexts/authContext";

const validate_key = async (
  username: string,
  password: string
): Promise<boolean> => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: encodePwd(username, password),
    },
  };

  const isCorrect = await fetch(`${API_DOMAIN}/admin/key`, requestOptions);

  return isCorrect.ok;
};

export default validate_key;

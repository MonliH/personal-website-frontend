import API_DOMAIN from "@lib/API_DOMAIN";
import { encodePwd } from "@contexts/authContext";

const validateKey = async (
  username: string,
  password?: string
): Promise<boolean> => {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: password ? encodePwd(username, password) : username,
    },
  };

  const isCorrect = await fetch(`${API_DOMAIN}/admin/key`, requestOptions);

  return isCorrect.ok;
};

export default validateKey;

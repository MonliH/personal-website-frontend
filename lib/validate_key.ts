import { API_DOMAIN } from "@lib/domains";

const validate_key = async (key: string): Promise<boolean> => {
  const request_options = {
    method: "POST",
    body: key,
  };

  const is_correct = await fetch(
    `${API_DOMAIN}/admin/key`,
    request_options
  );

  return is_correct.ok;
};

export default validate_key;

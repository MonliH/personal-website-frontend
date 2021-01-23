import { FormEvent } from "react";

import redirect from "@lib/redirect";
import API_DOMAIN from "@lib/API_DOMAIN";

const submit = async (
  e: FormEvent<HTMLFormElement>,
  setStatus: (value: string) => void
) => {
  e.preventDefault();
  const target: HTMLFormElement = e.target as HTMLFormElement;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: target.email.value,
      sender_name: target.sender_name.value,
      contents: target.contents.value,
    }),
  };

  const res = await fetch(`${API_DOMAIN}/contact/submit`, requestOptions);
  if (res.ok) {
    redirect("/thank-you-contact");
  } else {
    const msg = await res.text();
    setStatus(msg);
  }
};

export default submit;

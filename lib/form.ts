import { FormEvent } from "react";
import redirect from "@lib/redirect";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const submit = (
  e: FormEvent<HTMLFormElement>,
  setStatus: (value: string) => void
) => {
  e.preventDefault();
  const target: any = e.target as any;

  const requestOptions = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      // We can disable lint because it's an api thing
      // eslint-disable-next-line no-underscore-dangle
      _replyto: target._replyto.value,
      name: target.name.value,
      message: target.message.value,
    }),
  };

  fetch("https://formspree.io/xbjzleev", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const dataAny = data as any;
      if (dataAny.error) {
        if (dataAny.error.includes("_replyto")) {
          setStatus("Please enter a valid email.");
        } else {
          setStatus(capitalize(dataAny.error));
        }
      } else {
        setStatus("Message sent successfully!");
        redirect("/thank-you-contact");
        window.location.reload();
      }
    });
};

export default submit;

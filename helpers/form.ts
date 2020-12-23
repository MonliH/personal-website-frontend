import Router from "next/router";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const submit = (
  e: React.FormEvent<HTMLFormElement>,
  set_status: (value: string) => void
) => {
  e.preventDefault();
  let target: any = e.target as any;

  const requestOptions = {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      _replyto: target._replyto.value,
      name: target.name.value,
      message: target.message.value,
    }),
  };

  fetch("https://formspree.io/xbjzleev", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      let data_any = data as any;
      if (data_any.error) {
        if (data_any.error.includes("_replyto")) {
          set_status("Please enter a valid email.");
        } else {
          set_status(capitalize(data_any.error));
        }
      } else {
        set_status("Message sent successfully!");
        Router.replace("/thank-you-contact");
        window.location.reload();
      }
    });
};

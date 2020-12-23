import { useState } from "react";
import styled from "styled-components";

import { useAuth } from "@contexts/auth_context";
import redirect from "@lib/redirect";
import validate_key from "@lib/validate_key";

const Label = styled.label`
  color: black;
`;

const Input = styled.input``;

const SignIn = () => {
  const { set_auth_data } = useAuth();

  const [key, set_key] = useState<string>();
  const [wrong, set_wrong] = useState(false);

  const on_submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validate_key(key)) {
      set_auth_data(key);
      redirect("/admin/");
    } else {
      set_wrong(true);
    }
  };

  return (
    <form onSubmit={on_submit}>
      <Label>
        Key:
        <input
          type="password"
          name="key"
          placeholder="key"
          onChange={(e) => {
            set_key(e.target.value);
          }}
        />
      </Label>
      <Input type="submit" value="Authenticate" />
      {wrong ? <Label>Wrong Key</Label> : <></>}
    </form>
  );
};

export default SignIn;

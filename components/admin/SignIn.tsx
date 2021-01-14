import { useState } from "react";
import styled from "styled-components";

import { useAuth } from "@contexts/authContext";
import redirect from "@lib/redirect";
import validate_key from "@lib/validateKey";

const Label = styled.label`
  color: black;
`;

const Input = styled.input``;

const SignIn = () => {
  const { setAuthData } = useAuth();

  const [key, setKey] = useState<string>();
  const [wrong, setWrong] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validate_key(key)) {
      setAuthData(key);
      redirect("/admin/");
    } else {
      setWrong(true);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Label>
        Key:
        <input
          type="password"
          name="key"
          placeholder="key"
          onChange={(e) => {
            setKey(e.target.value);
          }}
        />
      </Label>
      <Input type="submit" value="Authenticate" />
      {wrong ? <Label>Wrong Key</Label> : <></>}
    </form>
  );
};

export default SignIn;

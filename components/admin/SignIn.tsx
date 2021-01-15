import { useState } from "react";
import styled from "styled-components";

import { useAuth } from "@contexts/authContext";
import redirect from "@lib/redirect";
import validateKey from "@lib/validateKey";

const Label = styled.label`
  color: black;
`;

const Input = styled.input``;

const SignIn = () => {
  const { setAuthData } = useAuth();

  const [password, setPassword] = useState<string>();
  const [user, setUsername] = useState<string>();
  const [wrong, setWrong] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (await validateKey(user, password)) {
      setAuthData(user, password);
      redirect("/admin/");
    } else {
      setWrong(true);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Label>
        Username:
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Label>
      <br />
      <Label>
        Password:
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Label>
      <Input type="submit" value="Authenticate" />
      {wrong ? <Label>Wrong Key</Label> : <></>}
    </form>
  );
};

export default SignIn;

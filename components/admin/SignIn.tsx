import { useState, FormEvent } from "react";
import styled from "styled-components";

import Bg from "@components/Bg";
import { useAuth } from "@contexts/authContext";
import redirect from "@lib/redirect";
import validateKey from "@lib/validateKey";

const Label = styled.label`
  font: 400 15px ${({ theme }) => theme.fonts.sansSerif};
`;

const Input = styled.input`
  display: block;
  margin-bottom: 20px;
`;

const SignIn = () => {
  const { setAuthData } = useAuth();

  const [password, setPassword] = useState<string>();
  const [user, setUsername] = useState<string>();
  const [wrong, setWrong] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (await validateKey(user, password)) {
      setAuthData(user, password);
      redirect("/admin/");
    } else {
      setWrong(true);
    }
  };

  return (
    <Bg altColor>
      <form onSubmit={onSubmit}>
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Label>Password:</Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input type="submit" value="Authenticate" />
        {wrong ? <Label>Wrong Key</Label> : <></>}
      </form>
    </Bg>
  );
};

export default SignIn;

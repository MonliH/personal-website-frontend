import { useState, FormEvent } from "react";

import Bg from "@components/Bg";
import { SubTitle } from "@components/Title";
import { WrapperCenterColumn } from "@components/Wrapper";
import { Button, Input, Label } from "@components/Inputs";

import { useAuth } from "@contexts/authContext";

import redirect from "@lib/redirect";
import validateKey from "@lib/validateKey";

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
      <WrapperCenterColumn style={{ height: "90vh" }}>
        <form onSubmit={onSubmit}>
          <SubTitle>Log In</SubTitle>
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
          <Button
            as="input"
            type="submit"
            value="Authenticate"
            style={{ marginTop: "15px" }}
          />
          {wrong ? <Label>Wrong credentials</Label> : <></>}
        </form>
      </WrapperCenterColumn>
    </Bg>
  );
};

export default SignIn;

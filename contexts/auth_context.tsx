import React, { createContext, useEffect, useState } from "react";

interface Auth {
  loading: boolean;
  key?: string;
}

interface AuthContext {
  auth: Auth;
  set_auth_data?: (v?: string) => void;
}

export const auth_context = createContext<AuthContext>({
  auth: { loading: true },
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, set_auth] = useState<Auth>({ loading: true });

  const set_auth_data = (key?: string) => {
    set_auth({ loading: false, key });
  };

  useEffect(() => {
    const key = window.localStorage.getItem("auth_data");
    if (key) {
      set_auth_data(key);
    } else {
      set_auth_data(auth.key);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("auth_data", auth.key ? auth.key : "");
  }, [auth]);

  return (
    <auth_context.Provider value={{ auth, set_auth_data }}>
      {children}
    </auth_context.Provider>
  );
};

export default AuthProvider;

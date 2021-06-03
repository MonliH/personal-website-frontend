import React, {
  ComponentType,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";

import Loading from "@components/Loading";
import Bg from "@components/Bg";

import redirect from "@lib/redirect";
import validateKey from "@lib/validateKey";

interface Auth {
  loading: boolean;
  key?: string;
}

interface AuthContextTy {
  auth: Auth;
  setAuthData?: (user?: string, pwd?: string) => void;
}

export const AuthContext = createContext<AuthContextTy>({
  auth: { loading: true },
});

export const encodePwd = (user: string, password: string) =>
  `Basic ${btoa(`${user}:${password}`)}`;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<Auth>({ loading: true });

  const setAuthData = (user?: string, pwd?: string) => {
    setAuth({
      loading: false,
      key: user && pwd ? encodePwd(user, pwd) : undefined,
    });
  };

  useEffect(() => {
    (async () => {
      const authData = window.localStorage.getItem("authData");

      // The key must be there, and it must be *valid*
      if (await validateKey(authData)) {
        setAuth({ loading: false, key: authData });
      } else {
        // No key, not loading
        setAuthData(undefined);
      }
    })();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("authData", auth.key ? auth.key : "");
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }) => {
  const { auth } = useAuth();
  if (auth.loading) {
    return (
      <Bg>
        <Loading />
      </Bg>
    );
  }
  if (!auth.key) {
    redirect("/admin/sign-in");
    return <div />;
  }
  return children;
};

export const withProtect = <P extends object>(Component: ComponentType<P>) => {
  const WithProtectedComponent = (props: P) => {
    return (
      <ProtectRoute>
        <Component {...props} />
      </ProtectRoute>
    );
  };
  return WithProtectedComponent;
};

import React, {
  ComponentType,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";
import Loading from "@components/Loading";
import redirect from "@lib/redirect";
import validate_key from "@lib/validateKey";

interface Auth {
  loading: boolean;
  key?: string;
}

interface AuthContext {
  auth: Auth;
  setAuthData?: (user?: string, pwd?: string) => void;
}

export const AuthContext = createContext<AuthContext>({
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
      const user = window.localStorage.getItem("authUser");
      const pwd = window.localStorage.getItem("authUser");

      // The key must be there, and it must be *valid*
      if (user && pwd && (await validate_key(user, pwd))) {
        setAuthData(user, pwd);
      } else {
        // No key, not loading
        setAuthData(undefined);
      }
    })();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("auth_data", auth.key ? auth.key : "");
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
    return <Loading />;
  } else if (!auth.key) {
    redirect("/admin/sign-in");
    return <div />;
  } else {
    return children;
  }
};

export const withProtect = <P extends object>(Component: ComponentType<P>) => (
  props: P
) => {
  return (
    <ProtectRoute>
      <Component {...props} />
    </ProtectRoute>
  );
};

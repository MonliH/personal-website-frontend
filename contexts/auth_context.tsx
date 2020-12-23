import React, {
  ComponentType,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";
import Loading from "@components/Loading";
import redirect from "@lib/redirect";

interface Auth {
  loading: boolean;
  key?: string;
}

interface AuthContext {
  auth: Auth;
  set_auth_data?: (v?: string) => void;
}

export const AuthContext = createContext<AuthContext>({
  auth: { loading: true },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, set_auth] = useState<Auth>({ loading: true });

  const set_auth_data = (key: string) => {
    set_auth({ loading: false, key });
  };

  useEffect(() => {
    const key = window.localStorage.getItem("auth_data");
    if (key) {
      set_auth_data(key);
    } else {
      // No key, not loading
      set_auth_data(undefined);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("auth_data", auth.key ? auth.key : "");
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, set_auth_data }}>
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
  }
  return children;
};

export const withProtect = <P extends object>(Component: ComponentType<P>) =>
  class withProtect extends React.Component<P> {
    render() {
      return (
        <ProtectRoute>
          <Component {...this.props} />
        </ProtectRoute>
      );
    }
  };

import "@styles/index.css";
import { AuthProvider } from "@contexts/auth_context";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;

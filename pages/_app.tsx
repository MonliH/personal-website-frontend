import "@styles/index.css";
import { AuthProvider } from "@contexts/authContext";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;

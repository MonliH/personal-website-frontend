import Router from "next/router";
import { useContext } from "react";

import { auth_context } from "@contexts/auth_context";
import validate_key from "@helpers/validate_key";

const login = "/admin/sign-in";

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getServerSideProps = async (context) => {
    const { auth } = useContext(auth_context);
  };

  return hocComponent;
};

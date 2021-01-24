import { useRouter } from "next/router";

import Layout from "@components/Layout";
import DeleteResource from "@components/admin/DeleteResource";
import { useAuth, withProtect } from "@contexts/authContext";

import deleteContact from "@lib/contact_api/deleteContact";

import theme from "@styles/theme";

const DeleteContact = () => {
  const router = useRouter();
  const { contactId } = router.query;
  const { auth } = useAuth();

  return (
    <Layout
      title="Delete Page"
      description="Delete page on admin panel."
      theme={theme.colors.lightBg}
    >
      <DeleteResource
        resourceName={contactId as string}
        deleteCallback={async () => {
          if (auth.key) {
            await deleteContact(auth.key, contactId as string);
          }
        }}
        redirectUrl={`/admin/contact/${contactId}`}
      />
    </Layout>
  );
};

export default withProtect(DeleteContact);

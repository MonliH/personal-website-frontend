import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import ContactPage from "@components/admin/contact/ContactPage";
import Loading from "@components/Loading";

import Contact from "@lib/contact_api/form";
import { getContact } from "@lib/contact_api/fetchContacts";

import { withProtect, useAuth } from "@contexts/authContext";

const ContactInfo = () => {
  const router = useRouter();
  const { contactId } = router.query;
  const { auth } = useAuth();
  const [contact, setContact] = useState<null | Contact>(null);

  useEffect(() => {
    if (contactId) {
      (async () => {
        setContact(await getContact(auth.key, contactId as string));
      })();
    }
  }, [router.query]);
  return contact ? <ContactPage contact={contact} /> : <Loading />;
};

export default withProtect(ContactInfo);

import Contact, { intoContactSubmission } from "@lib/contact_api/form";
import API_DOMAIN from "@lib/API_DOMAIN";

export const getNumContacts = async (auth: string): Promise<number> => {
  const contactsNum = parseInt(
    await (
      await fetch(`${API_DOMAIN}/admin/contacts`, {
        headers: { Authorization: auth },
      })
    ).text(),
    10
  );
  return contactsNum;
};

export const getRange = async (
  auth: string,
  start: number,
  end: number
): Promise<Array<Contact>> => {
  const contactRes = await fetch(
    `${API_DOMAIN}/admin/contact/range/${start}/${end}`,
    { headers: { Authorization: auth } }
  );
  const contacts: Array<Contact> = (await contactRes.json()).map((entry: any) =>
    intoContactSubmission(entry)
  );
  return contacts;
};

export const getContactsPage = async (
  auth: string,
  submissionsPerPage: number,
  pageNo: number
): Promise<[number, Array<Contact>]> => {
  const totalPostNums = await getNumContacts(auth);
  const blogPagesNum = Math.ceil(totalPostNums / submissionsPerPage);
  const pageStart = submissionsPerPage * pageNo;
  const possibleEnd = pageStart + submissionsPerPage;
  const entries = await getRange(
    auth,
    pageStart,
    possibleEnd > totalPostNums ? totalPostNums : possibleEnd
  );
  return [blogPagesNum, entries];
};

export const getContact = async (
  auth: string,
  id: string
): Promise<Contact> => {
  const res = await fetch(`${API_DOMAIN}/admin/contact/get/${id}`, {
    headers: { Authorization: auth },
  });
  const blogContents = intoContactSubmission(await res.json());
  return blogContents;
};

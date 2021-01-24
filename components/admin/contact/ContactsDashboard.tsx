import Link from "next/link";
import styled from "styled-components";

import { DashboardMargin } from "@components/admin/Panel";
import { SubTitle } from "@components/Title";
import Loading from "@components/Loading";

import Contact from "@lib/contact_api/form";

const ContactWrapper = styled.div`
  font: 15px ${({ theme }) => theme.fonts.sansSerif};
  margin-bottom: 5px;
`;

const Name = styled.p`
  display: inline-block;
  white-space: pre;
  font-weight: bold;
  margin: 0;
`;

const Date = styled(Name)`
  font-weight: normal;
`;

const SingleContact = ({ contact }: { contact: Contact }) => {
  return (
    <ContactWrapper>
      <Link href={`/admin/contact/${contact.id}`} passHref>
        <a>
          <Name>{contact.senderName} &mdash; </Name>
          <Date>{contact.datetime.toLocaleString()}</Date>
        </a>
      </Link>
    </ContactWrapper>
  );
};

export interface ContactDashboardProps {
  contacts: Array<Contact>;
  contactsLoading: boolean;
}

const ContactsDashboard = ({
  contactsLoading,
  contacts,
}: ContactDashboardProps) => {
  return (
    <DashboardMargin>
      <SubTitle>Contact Submissions</SubTitle>
      {contactsLoading ? (
        <Loading />
      ) : (
        contacts.map((contact) => (
          <SingleContact contact={contact} key={contact.id} />
        ))
      )}
    </DashboardMargin>
  );
};

export default ContactsDashboard;

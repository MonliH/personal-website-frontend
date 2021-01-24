import styled from "styled-components";
import Contact from "@lib/contact_api/form";

import Bg from "@components/Bg";
import { SubTitle } from "@components/Title";
import { DashboardWrapper } from "@components/admin/Panel";
import AdminPanelLink from "@components/admin/AdminPanelLink";
import { RedButton } from "@components/Inputs";

import redirect from "@lib/redirect";

const Date = styled.p`
  font: bold 15px ${({ theme }) => theme.fonts.sansSerif};
`;

const ContactContents = styled.p`
  font: 16px ${({ theme }) => theme.fonts.sansSerifBody};
  width: 30%;
  white-space: pre-wrap;
`;

const ContactPage = ({ contact }: { contact: Contact }) => {
  return (
    <Bg altColor>
      <DashboardWrapper>
        <AdminPanelLink />

        <RedButton
          type="button"
          onClick={() => {
            redirect(`/admin/contact/${contact.id}/delete`);
          }}
        >
          DELETE THIS MESSAGE
        </RedButton>
        <SubTitle>A Message From {contact.senderName}</SubTitle>
        <Date>{contact.datetime.toLocaleString()}</Date>
        <ContactContents>{contact.contents}</ContactContents>
      </DashboardWrapper>
    </Bg>
  );
};

export default ContactPage;

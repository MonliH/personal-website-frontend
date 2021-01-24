import styled from "styled-components";

import BlogsDashboard, {
  BlogDashboardProps,
} from "@components/admin/blog/BlogsDashboard";
import ContactsDashboard, {
  ContactDashboardProps,
} from "@components/admin/contact/ContactsDashboard";
import { Row } from "@components/Wrapper";
import { Button } from "@components/Inputs";

import { useAuth } from "@contexts/authContext";

const PlainTitle = styled.div`
  font: bold 70px ${({ theme }) => theme.fonts.sansSerif};
`;

export const DashboardMargin = styled.div`
  margin-bottom: 50px;
`;

export const DashboardWrapper = styled.div`
  margin-left: 50px;
  margin-top: 50px;
`;

const Panel = ({
  blogEntries,
  blogLoading,
  contacts,
  contactsLoading,
  children,
}: BlogDashboardProps & ContactDashboardProps) => {
  const { setAuthData } = useAuth();

  const onLogOut = () => {
    setAuthData!(undefined);
  };

  return (
    <DashboardWrapper>
      <DashboardMargin>
        <PlainTitle>Admin Panel</PlainTitle>
        <Button onClick={onLogOut}>Log Out</Button>
      </DashboardMargin>
      <Row>
        <BlogsDashboard blogEntries={blogEntries} blogLoading={blogLoading}>
          {children}
        </BlogsDashboard>
        <ContactsDashboard
          contacts={contacts}
          contactsLoading={contactsLoading}
        />
      </Row>
    </DashboardWrapper>
  );
};

export default Panel;

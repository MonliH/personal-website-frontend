import styled from "styled-components";

import BlogsDashboard, {
  BlogPanelProps,
} from "@components/admin/BlogsDashboard";
import ContactsDashboard from "@components/admin/ContactsDashboard";
import { useAuth } from "@contexts/authContext";

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
`;

export const SubTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.sansSerif};
`;

export const PanelButton = styled.button``;

const Panel = (p: BlogPanelProps) => {
  const { setAuthData } = useAuth();

  const onLogOut = () => {
    setAuthData!(undefined);
  };

  return (
    <>
      <Title>Admin Panel</Title>
      <PanelButton onClick={onLogOut}>Log Out</PanelButton>
      <BlogsDashboard blogEntries={p.blogEntries} loading={p.loading} />
      <ContactsDashboard />
    </>
  );
};

export default Panel;

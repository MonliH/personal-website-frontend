import Link from "next/link";

import styled from "styled-components";

const StyledLink = styled.a`
  font-size: 30px;
  margin-bottom: 30px;
  display: block;
`;

const AdminPanelLink = () => {
  return (
    <Link href="/admin/" passHref>
      <StyledLink>Admin Panel</StyledLink>
    </Link>
  );
};

export default AdminPanelLink;

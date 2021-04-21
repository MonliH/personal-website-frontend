import Link from "next/link";
import styled from "styled-components";
import { Row, WrapperCenterColumn } from "@components/Wrapper";

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;

const Title = styled.div`
  font: bold 80px ${({ theme }) => theme.fonts.sansSerif};
`;

const StyledLink = styled.a`
  font-size: 20px;
  margin-right: 20px;
`;

const SubTitle = styled.div`
  font: 30px ${({ theme }) => theme.fonts.sansSerifBody};
  width: 450px;
  text-align: center;
`;

const HomePage = () => {
  return (
    <Centered>
      <div>
        <WrapperCenterColumn style={{ marginBottom: "50px" }}>
          <Title>Jonathan Li</Title>
          <SubTitle>I do things.</SubTitle>
        </WrapperCenterColumn>
        <Row style={{ justifyContent: "center" }}>
          <Link href="/blog" passHref>
            <StyledLink>blog</StyledLink>
          </Link>
          <Link href="https://github.com/MonliH" passHref>
            <StyledLink>github</StyledLink>
          </Link>
          <Link href="https://www.linkedin.com/in/jonathan-x-li" passHref>
            <StyledLink>linkedin</StyledLink>
          </Link>
        </Row>
      </div>
    </Centered>
  );
};

export default HomePage;

import { FC } from "react";
import styled from "styled-components";

import { Row, Margin, RowAlign } from "@components/Wrapper";
import { WhiteLink, StyledLink } from "@components/Links";
import { GitHub, IconProps, Linkedin, Rss, Mail } from "react-feather";
import Link from "next/link";

const Text = styled.div`
  font: bold 20px ${({ theme }) => theme.fonts.sansSerifBody};
  margin-left: 4px;
  margin-right: 18px;
  color: inherit;
`;

const entries: [FC<IconProps>, string, string, boolean][] = [
  [GitHub, "github", "https://github.com/MonliH", false],
  [Linkedin, "linkedin", "https://linkedin.com/in/jonatli", false],
  [Rss, "blog", "/blog", true],
  [Mail, "contact", "/contact", true],
];

const Icons = () => {
  return (
    <Margin top={15}>
      <Row>
        {entries.map(([Icon, text, link, internal]) => {
          const inner = (
            <RowAlign>
              <WhiteLink className="white-link">
                <Icon />
              </WhiteLink>
              <Text className="white-text">{text}</Text>
            </RowAlign>
          );
          return internal ? (
            <Link key={text} href={link} passHref>
              <StyledLink>{inner}</StyledLink>
            </Link>
          ) : (
            <StyledLink key={text} href={link}>
              {inner}
            </StyledLink>
          );
        })}
      </Row>
    </Margin>
  );
};

export default Icons;

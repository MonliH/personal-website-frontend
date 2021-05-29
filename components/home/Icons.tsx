import { FC } from "react";
import styled from "styled-components";

import { Margin, Row } from "@components/Wrapper";
import { GitHub, IconProps, Linkedin, Rss } from "react-feather";
import Link from "next/link";

const Text = styled.div`
  font: bold 20px ${({ theme }) => theme.fonts.sansSerifBody};
  margin-left: 4px;
  margin-right: 16px;
  color: inherit;
`;

const WhiteLink = styled.div`
  color: inherit;
`;

const StyledLink = styled.a`
  color: #cdcdcd;
  transition: color 0.2s ease;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const entries: [FC<IconProps>, string, string, boolean][] = [
  [GitHub, "github", "https://github.com/MonliH", false],
  [Linkedin, "linkedin", "https://linkedin.com/in/jonatli", false],
  [Rss, "blog", "/blog", true],
];

const Icons = () => {
  return (
    <Margin top={15}>
      <Row>
        {entries.map(([Icon, text, link, internal]) => {
          const inner = (
            <Row>
              <WhiteLink className="white-link">
                <Icon />
              </WhiteLink>
              <Text className="white-text">{text}</Text>
            </Row>
          );
          return internal ? (
            <Link key={text} href={link}>
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

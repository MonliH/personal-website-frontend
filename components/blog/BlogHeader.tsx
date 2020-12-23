import styled from "styled-components";

import AnimatedLink from "@components/StyledLink";

const Header = styled.div`
  color: black;
  font: 400 45px "IBM Plex Mono", monospace;
  width: 700px;

  @media (max-width: 825px) {
    width: 95vw;
  }
`;

const StyledAnimatedLink = styled(AnimatedLink)`
  font: inherit;
`;

const BlogHeader = ({ blog, font }: { blog?: boolean; font?: string }) => {
  return (
    <Header style={{ fontSize: font }}>
      <StyledAnimatedLink link="/" text="Jonathan Li" />
      's {blog ? <StyledAnimatedLink link="/blog" text="blog" /> : <>blog</>}
    </Header>
  );
};

export default BlogHeader;

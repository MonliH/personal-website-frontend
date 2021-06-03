import Link from "next/link";
import styled from "styled-components";

const Header = styled.div`
  font: 500 45px ${(props) => props.theme.fonts.sansSerif};
  width: 700px;
  margin-left: 3px;

  @media (max-width: 825px) {
    width: 95vw;
  }
`;

const StyledAnimatedLink = styled.a`
  font: inherit;
  font-weight: bold;
`;

const BlogHeader = ({ blog, font }: { blog?: boolean; font?: string }) => {
  return (
    <Header style={{ fontSize: font }}>
      Jonathan Li &#39;s{" "}
      {blog ? (
        <Link href="/blog" passHref>
          <StyledAnimatedLink>blog</StyledAnimatedLink>
        </Link>
      ) : (
        "blog"
      )}
    </Header>
  );
};

export default BlogHeader;

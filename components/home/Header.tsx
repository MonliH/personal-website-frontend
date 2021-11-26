import Link from "next/link";
import { MutableRefObject, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { Menu, ArrowLeft } from "react-feather";

const HeaderMain = styled.div`
  overflow: hidden;
  background-color: #1d1d1d;
  background-color: rgba(29, 29, 29, 0.5);
  border-bottom: 1px solid #171717;
  z-index: 100;
  white-space: nowrap;
  position: fixed;
  width: 100vw;
  height: 50px;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const HeaderLinks = styled.div`
  font: 15px ${({ theme }) => theme.fonts.sansSerifAlt};
  float: right;
  display: flex;
  flex: 0 0;
  margin-right: 30px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: block;

  @media (max-width: 644px) {
    display: none;
  }
`;

const HeaderLink = styled.button`
  font: 15px ${({ theme }) => theme.fonts.sansSerifAlt};
  color: white;
  text-decoration: none;
  cursor: pointer;
  margin-left: 14px;
  background: none;
  border: none;
  color: white;
  width: fit-content;

  &:hover {
    color: #e6e6e6;
  }
`;

const HeaderLinkA = styled(HeaderLink).attrs({ as: "r" })`
  margin-left: 22px;
`;

const HeaderLinkIcon = styled.a`
  font: 15px ${({ theme }) => theme.fonts.sansSerifAlt};
  color: white;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: filter 0.2s ease-in-out;
  position: relative;
  margin-left: 15px;
  float: right;

  &:hover {
    filter: brightness(70%);
  }
`;

const HeaderLinkForeground = styled.div`
  background-color: none;
  width: 27px;
  height: 27px;
  position: absolute;
  top: -2px;
  left: 0;
`;

const HeaderName = styled.button`
  margin-left: 22px;
  font: bold 20px ${({ theme }) => theme.fonts.sansSerifAlt};
  margin-bottom: 20px;
  float: left;
  color: white;
  text-decoration: none;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  background: none;
  border: none;
  width: fit-content;

  &:hover {
    color: #e6e6e6;
  }
`;

const HeaderImage = styled.img`
  margin-top: -2px;
  float: right;
  width: 27px;
  height: 27px;
`;

const HeaderNav = styled.button`
  float: right;
  background: none;
  border: none;
  display: none;
  margin-top: 10px;
  @media (max-width: 644px) {
    display: block;
  }
`;

const HeaderClose = styled(HeaderNav)`
  margin-left: 10px;
  float: left;
`;

interface HeaderSidebarProps {
  links: Array<JSX.Element>;
  navOn: boolean;
  setNavOn: (val: boolean) => void;
}

const Absolute = styled(animated.div)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
  transform: translateX(-100vw);
`;

const Right = styled.div`
  float: right;
  width: fit-content;
  margin-top: 15px;
`;

const NavSidebar = ({ navOn, setNavOn, links }: HeaderSidebarProps) => {
  const style = useSpring({ translateX: navOn ? "0vw" : "-100vw" });
  return (
    <Absolute onClick={() => setNavOn(false)} style={style as any}>
      {links.map((link: JSX.Element) => {
        return <Right key={link.key}>{link}</Right>;
      })}
    </Absolute>
  );
};

const Header = ({
  links,
  keys,
  masterRef,
}: {
  links: MutableRefObject<Record<string, HTMLDivElement>>;
  keys: Array<string>;
  masterRef: MutableRefObject<HTMLDivElement>;
}) => {
  const [navOn, setNavOn] = useState(false);

  const linksLeft: Array<JSX.Element> = [];
  linksLeft.push(
    <HeaderClose
      onClick={() => setNavOn(false)}
      aria-label="Close Menu"
      key="close-menu"
    >
      <HeaderImage as="div">
        <ArrowLeft width={27} height={27} color="white" />
      </HeaderImage>
    </HeaderClose>
  );

  for (let i = 0; i < keys.length; i++) {
    linksLeft.push(
      <HeaderLink
        onClick={(e) => {
          e.preventDefault();
          links.current[keys[i]].scrollIntoView();
        }}
        key={keys[i]}
      >
        {keys[i]}
      </HeaderLink>
    );
  }

  linksLeft.push(
    <Link href="/blog" key="blog" passHref>
      <HeaderLinkA>Blog</HeaderLinkA>
    </Link>
  );

  // Linkedin logo
  linksLeft.push(
    <div style={{ display: "inline" }}>
      <HeaderLinkIcon
        key="linkedin-image"
        href="https://www.linkedin.com/in/jonatli/"
        target="_blank"
        rel="noopener noreferrer"
        className="header-link"
        style={navOn ? { float: "left", marginLeft: "22px" } : {}}
      >
        <HeaderLinkForeground style={{ borderRadius: 5 }} />
        <HeaderImage
          src="/graphics/linkedin-white.png"
          id="linkedin-header-image"
          alt="Linkedin"
          width={27}
          height={27}
        />
      </HeaderLinkIcon>
      <HeaderLinkIcon
        key="github-image"
        href="https://github.com/MonliH"
        target="_blank"
        rel="noopener noreferrer"
        className="header-link"
        style={
          navOn ? { float: "left", marginLeft: "22px" } : { marginLeft: "30px" }
        }
      >
        <HeaderLinkForeground style={{ borderRadius: 14 }} />
        <HeaderImage
          src="/graphics/github-white.png"
          id="header-image"
          alt="Github"
          width={27}
          height={27}
        />
      </HeaderLinkIcon>
    </div>
  );

  return (
    <>
      <NavSidebar navOn={navOn} setNavOn={setNavOn} links={linksLeft} />
      <HeaderMain>
        <HeaderName
          onClick={(e) => {
            e.preventDefault();
            masterRef.current.scrollIntoView();
          }}
        >
          Jonathan Li
        </HeaderName>
        <HeaderNav onClick={() => setNavOn(true)} aria-label="Menu">
          <HeaderImage as="div">
            <Menu width={27} height={27} color="white" />
          </HeaderImage>
        </HeaderNav>
        <HeaderLinks>{linksLeft}</HeaderLinks>
      </HeaderMain>
    </>
  );
};

export default Header;

import { MutableRefObject, useState } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
import Link from "next/link";

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
  font: 15px Montserrat, sans-serif;
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
  font: 15px Montserrat, sans-serif;
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

const HeaderLinkGithub = styled.a`
  font: 15px Montserrat, sans-serif;
  color: white;
  text-decoration: none;
  padding-left: 30px;
  cursor: pointer;
`;

const HeaderName = styled.button`
  margin-left: 22px;
  font: bold 20px Montserrat, sans-serif;
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
  @media (max-width: 644px) {
    display: block;
  }
`;

interface HeaderSidebarProps {
  links: Array<JSX.Element>;
  navOn: boolean;
  setNavOn: (val: boolean) => void;
}

const Absolute = styled(animated.div)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.3);
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

const NavSidebar = (p: HeaderSidebarProps) => {
  const style = useSpring({ translateX: p.navOn ? "0vw" : "-100vw" });
  return (
    <Absolute onClick={() => p.setNavOn(false)} style={style as any}>
      {p.links.map((link: JSX.Element, i: number) => {
        return <Right key={i}>{link}</Right>;
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

  let linksLeft: Array<JSX.Element> = [];

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
    <Link passHref={true} href="/blog" key="blog">
      <HeaderLinkA>Blog</HeaderLinkA>
    </Link>
  );

  // Github logo
  linksLeft.push(
    <HeaderLinkGithub
      key="github-image"
      href="https://github.com/MonliH"
      target="_blank"
      rel="noopener noreferrer"
      className="header-link"
    >
      <HeaderImage
        src="/graphics/github-white.png"
        id="header-image"
        alt="Github"
        width={27}
        height={27}
      ></HeaderImage>
    </HeaderLinkGithub>
  );

  const toggleNav = () => {
    setNavOn(!navOn);
  };

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
        <HeaderNav
          onClick={() => toggleNav()}
          style={{ marginTop: "10px" }}
          aria-label="Menu"
        >
          <HeaderImage
            src="/graphics/menu.svg"
            alt="Menu"
            width={27}
            height={27}
          />
        </HeaderNav>
        <HeaderLinks>{linksLeft}</HeaderLinks>
      </HeaderMain>
    </>
  );
};

export default Header;

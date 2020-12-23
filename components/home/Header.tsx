import { useState } from "react";

import styled from "styled-components";

import { animated, useSpring } from "react-spring";

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
`;

const HeaderLink = styled.a`
  font: 15px Montserrat, sans-serif;
  color: white;
  text-decoration: none;
  padding-left: 30px;
`;

const HeaderLinkGithub = styled.a`
  font: 15px Montserrat, sans-serif;
  color: white;
  text-decoration: none;
  padding-left: 30px;
`;

const HeaderName = styled.a`
  margin-left: 30px;
  font: bold 20px Montserrat, sans-serif;
  margin-bottom: 20px;
  float: left;
  color: white;
  text-decoration: none;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
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
`;

const links = [
  ["About Me", "#about"],
  ["My Projects", "#projects"],
  ["Blog", "blog"],
  ["Contact Me", "#contact"],
];

interface HeaderSidebarProps {
  links: Array<JSX.Element>;
  nav_on: boolean;
  set_nav_on: (val: boolean) => void;
}

const Absolute = styled(animated.div)`
  position: absolute;
  width: 0vw;
  height: 100vh;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-top: 10vh;
`;

const Right = styled.div`
  float: right;
  width: fit-content;
  margin-top: 15px;
`;

const NavSidebar = (p: HeaderSidebarProps) => {
  const style = useSpring({ width: p.nav_on ? "100vw" : "0vw" });
  return (
    <Absolute onClick={() => p.set_nav_on(false)} style={style as any}>
      {p.links.map((link: JSX.Element, i: number) => {
        return <Right key={i}>{link}</Right>;
      })}
    </Absolute>
  );
};

const Header = ({ width }: { width: number }) => {
  const [nav_on, set_nav_on] = useState(false);

  let links_left = new Array(links.length);
  for (const [display, hash] of links) {
    links_left.push(
      <HeaderLink href={`/${hash}`} key={hash}>
        {display}
      </HeaderLink>
    );
  }

  // Github logo
  links_left.push(
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
      ></HeaderImage>
    </HeaderLinkGithub>
  );

  const toggle_nav = () => {
    set_nav_on(!nav_on);
  };

  return (
    <>
      <NavSidebar nav_on={nav_on} set_nav_on={set_nav_on} links={links_left} />
      <HeaderMain>
        <HeaderName href="/#master">Jonathan Li</HeaderName>
        {width < 644 ? (
          <HeaderNav onClick={() => toggle_nav()} style={{ marginTop: "10px" }}>
            <HeaderImage src="/graphics/menu.svg" />
          </HeaderNav>
        ) : (
          <HeaderLinks>{links_left}</HeaderLinks>
        )}
      </HeaderMain>
    </>
  );
};

export default Header;

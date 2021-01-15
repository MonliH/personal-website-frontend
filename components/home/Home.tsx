import { useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

import Header from "@components/home/Header";
import { NameTitleWrapper } from "@components/Wrapper";
import { sharedTitle } from "@components/Title";
import Contact from "@components/home/Contact";
import About from "@components/home/About";
import Projects from "@components/home/Projects";

import useWindowSize from "@hooks/useWindowSize";

const SubHeading = styled.div`
  font: bold 30px Montserrat, sans-serif;
  position: relative;
  top: 100px;
  padding-left: 10px;
  color: white;

  @media (max-width: 430px) {
    font-size: 20px;
    top: 70px;
  }
`;

const Jonathan = styled.div`
  ${sharedTitle}
  font: bold 70px Montserrat, sans-serif;
  position: relative;
  height: 100px;
  background-position: left 19px top 40px;
  white-space: pre;
`;

const Li = styled.div`
  ${sharedTitle}
  font: bold 70px Montserrat, sans-serif;
  color: #ff3d0d;
  position: absolute;
  top: 290px;
  background-position: left 19px top 0px;
  height: 90px;
  white-space: pre;

  @media (max-width: 430px) {
    background-position: left 10px top 0px;
    top: 145px;
  }
`;

const TitlePage = styled.div`
  top: 0;
  left: 0;
  height: 70vh;
  width: 100vw;
  padding: 0;

  @media (max-width: 430px) {
    height: fit-content;
  }
`;

const FrontPage = styled.div`
  display: flex;
  flex-direction: row;
  background: #262626;

  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const TitleImageWrapper = styled.div`
  position: relative;
  height: 70vh;
  width: 70vh;
  float: right;
  margin-right: 15vw;
  margin-top: 120px;
  filter: saturate(105%);
  transition: 0.8s;
  transform: translateY(0);
  z-index: 10;
  display: block;
  min-width: 70vh;
  min-height: 70vh;
  margin-left: -100px;

  @media (max-width: 430px) {
    margin-top: 100px;
    width: 85vw;
    height: 85vw;
    min-width: 85vw;
    min-height: 85vw;
    margin-left: 7vw;
  }
`;

const Bridge = styled.div`
  position: relative;
  height: 30vh;
  display: block;
  background: rgb(38, 38, 38);
  background: -moz-linear-gradient(
    180deg,
    rgba(38, 38, 38, 1) 0%,
    rgba(29, 29, 29, 1) 100%
  );
  background: -webkit-linear-gradient(
    180deg,
    rgba(38, 38, 38, 1) 0%,
    rgba(29, 29, 29, 1) 100%
  );
  background: linear-gradient(
    180deg,
    rgba(38, 38, 38, 1) 0%,
    rgba(29, 29, 29, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#262626", endColorstr="#1d1d1d", GradientType=1);

  @media (max-width: 430px) {
    height: 14vh;
  } ;
`;

const Background = styled.div`
  background-color: #1d1d1d;
`;

const NoScriptImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const TransparentDiv = styled.div`
  color: transparent;
`;

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#1D1D1D";
  }, []);

  const [width] = useWindowSize();
  const refs = useRef<Record<string, HTMLDivElement>>({});
  const masterRef = useRef<HTMLDivElement>();

  const addRef = (name: string) => (ref: HTMLDivElement) => {
    refs.current[name] = ref;
  };

  const linkOrder = ["About Me", "My Projects", "Contact Me"];

  const pages: Array<JSX.Element> = [
    <About ref={addRef(linkOrder[0])} key="about" />,
    <Projects width={width} ref={addRef(linkOrder[1])} key="projects" />,
    <Contact ref={addRef(linkOrder[2])} key="contact" />,
  ];

  return (
    <div ref={masterRef}>
      <Header links={refs} keys={linkOrder} masterRef={masterRef} />
      <Background>
        <FrontPage>
          <TitlePage>
            <NameTitleWrapper>
              <Jonathan>
                <div>JONATHAN&thinsp;</div>
              </Jonathan>
              <Li>
                <div>LI&thinsp;</div>
              </Li>
              <SubHeading>I Delight in Coding</SubHeading>
            </NameTitleWrapper>
          </TitlePage>
          <TitleImageWrapper>
            <TransparentDiv>
              <Image
                src="/graphics/title.png"
                alt="My Artwork"
                layout="fill"
                priority
                sizes="70vh"
              />
            </TransparentDiv>

            {/* Here we add noscript so people with javascript disabled can still see the image */}
            <noscript>
              <NoScriptImg src="/graphics/title.png" alt="My artwork" />
            </noscript>
          </TitleImageWrapper>
        </FrontPage>
        <Bridge />
        {pages}
      </Background>
    </div>
  );
};

export default Home;

import { useRef } from "react";
import styled from "styled-components";
import Image from "next/image";

import Header from "@components/home/Header";
import { NameTitleWrapper } from "@components/Wrapper";
import { ThemedTitle } from "@components/Title";
import Contact from "@components/home/Contact";
import About from "@components/home/About";
import Projects from "@components/home/Projects";

import useWindowSize from "@hooks/useWindowSize";

const SubHeading = styled.div`
  font: bold 30px ${({ theme }) => theme.fonts.sansSerifAlt};
  position: relative;
  top: 100px;
  padding-left: 10px;
  color: white;

  @media (max-width: 430px) {
    font-size: 20px;
    top: 70px;
  }
`;

const Jonathan = styled(ThemedTitle)`
  font: bold 70px ${({ theme }) => theme.fonts.sansSerifAlt};
  position: relative;
  height: 100px;
  white-space: pre;
`;

const Li = styled(ThemedTitle)`
  font: bold 70px ${({ theme }) => theme.fonts.sansSerifAlt};
  background-position: left 19px top 0px !important;
  position: absolute;
  top: 290px;
  height: 90px;
  white-space: pre;

  @media (max-width: 430px) {
    font-size: 40px;
    background-position: left 10px top 0px !important;
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
  z-index: 10;
  display: block;
  min-width: 70vh;
  min-height: 70vh;
  margin-left: -100px;

  transition: filter 0.3s;

  @media (max-width: 430px) {
    margin-top: 100px;
    width: 85vw;
    height: 85vw;
    min-width: 85vw;
    min-height: 85vw;
    margin-left: 7vw;
  }

  &:hover {
    filter: saturate(120%);
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
  const [width] = useWindowSize();
  const refs = useRef<Record<string, HTMLDivElement>>({});
  const masterRef = useRef<HTMLDivElement>();

  const addRef = (name: string) => (ref: HTMLDivElement) => {
    refs.current[name] = ref;
  };

  const linkOrder = ["About Me", "My Projects", "Contact Me"];

  const pages: Array<JSX.Element> = [
    <About ref={addRef(linkOrder[0])} id={linkOrder[0]} key={linkOrder[0]} />,
    <Projects
      width={width}
      ref={addRef(linkOrder[1])}
      id={linkOrder[1]}
      key={linkOrder[1]}
    />,
    <Contact ref={addRef(linkOrder[2])} id={linkOrder[2]} key={linkOrder[2]} />,
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

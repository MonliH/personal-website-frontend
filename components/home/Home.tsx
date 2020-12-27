import { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";

import Header from "@components/home/Header";
import { NameTitleWrapper } from "@components/Wrapper";
import { shared_title } from "@components/Title";
import Contact from "@components/home/Contact";
import About from "@components/home/About";
import Projects from "@components/home/Projects";
import Loading from "@components/Loading";

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
  ${shared_title}
  font: bold 70px Montserrat, sans-serif;
  position: relative;
  height: 100px;
  background-position: left 19px top 40px;
  white-space: pre;
`;

const Li = styled.div`
  ${shared_title}
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

interface PropsStyledImage {
  invisible: boolean;
}

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#1D1D1D";
  }, []);

  const [width] = useWindowSize();

  const mappings: Array<[string, JSX.Element]> = [
    ["about", <About />],
    ["projects", <Projects width={width} />],
    ["contact", <Contact />],
  ];

  let other_pages = new Array(0);
  for (const [id_name, page] of mappings) {
    other_pages.push(
      <div key={id_name} id={id_name}>
        {page}
      </div>
    );
  }

  return (
    <div id="master">
      <Header />
      <Background>
        <FrontPage>
          <TitlePage>
            <NameTitleWrapper>
              <Jonathan>
                <div>JONATHAN </div>
              </Jonathan>
              <Li>
                <div>LI </div>
              </Li>
              <SubHeading>I Delight in Coding</SubHeading>
            </NameTitleWrapper>
          </TitlePage>
          <TitleImageWrapper>
            <Image
              src="/graphics/title.png"
              alt="My Artwork"
              layout="fill"
              priority={true}
            />

            {/* Here we add noscript so people with javascript disabled can still see the image */}
            <noscript>
              <NoScriptImg src="/graphics/title.png" alt="My artwork" />
            </noscript>
          </TitleImageWrapper>
        </FrontPage>
        <Bridge></Bridge>
        {other_pages}
      </Background>
    </div>
  );
};

export default Home;

import { Fragment } from "react";
import Image from "next/image";
import HomeSvg from "../../public/paths/home.svg";
import Sep1Svg from "../../public/paths/sep1.svg";
import Sep2AltSvg from "../../public/paths/sep2_alt.svg";
import SideSvg from "../../public/paths/side.svg";
import SpeechSvg from "../../public/paths/speech.svg";
import jonathanImg from "../../public/jonathan_li_newer.jpg";
import { hackathonProjects, papers, personalProjects, websites } from "./info";
import Link from "next/link";
import LenisScroller from "@/libs/LenisScroller";
import Header from "@/app/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="px-4 lg:px-28 py-32">
        <LenisScroller />
        <HomeSvg className="absolute top-0 h-[690px] w-11/12 lg:left-16 lg:w-[80%] lg:h-[92%] 2xl:h-[90%] 2xl:w-[85%] pointer-events-none" />
        <p className="ml-3 mt-8 text-3xl lg:text-4xl font-serif lg:ml-0 lg:mt-0">
          Hello I'm
        </p>
        <h1 className="ml-3 mt-0 leading-tight w-9/12 font-bold mb-[600px] text-6xl lg:w-auto lg:ml-0 lg:mt-0 lg:text-[115pt] 2xl:text-[150pt]">
          Jonathan Li
        </h1>
        <p className="left-[45%] w-1/2 absolute top-[700px] text-lg lg:w-[31rem] lg:text-2xl lg:left-[calc(7.5rem+49vw)] lg:top-[calc(90%-125px)] 2xl:left-[calc(12rem+49vw)] 2xl:top-[calc(80%-50px)]">
          I’ve been messing around making what I think is cool stuff—ai stuff,
          website designs, hackathon projects—for the past six years.
        </p>
        <div className="flex flex-row w-full gap-y-8 gap-x-16 items-end flex-wrap-reverse lg:flex-nowrap">
          <div className="flex flex-col gap-3 w-[min(20rem,95%)] text-sm 2xl:w-96 2xl:text-base flex-shrink-0">
            <h2 className="font-bold m-0 text-3xl">who am i?</h2>
            <p className="font-normal">
              I’m Jonathan, canadian ai researcher, web designer, computer
              programmer, entrepreneur, gymgoer, piano player...
            </p>
            <p className="font-normal">
              I started coding five years ago when I was captivated by the magic
              behind a neural network. Now I’ve graduated from high school,
              currently working at Cohere doing machine learning stuff.
            </p>
            <p className="font-normal">
              I’m trying to purse life’s big questions—which is probably why my
              interests bounce around so often, from AI (to assist our quest) to
              physics (to explain our world) to entrepreneurship (to fund our
              exploration)—though I’m honestly unlikely to succeed, at least on
              my own.
            </p>
          </div>
          <div className="flex-1 flex-shrink-0 basis-[min(24rem,90%)] lg:basis-96">
            <Image
              src={jonathanImg}
              alt="Image of me"
              quality={100}
              className="w-[100%] h-auto"
            ></Image>
          </div>
        </div>
        <Sep1Svg className="absolute left-0 mt-8 lg:-mt-8" />
        <div className="grid mt-40 gap-y-3 lg:grid-rows-[max-content_1fr] lg:grid-cols-[max-content_1fr] lg:gap-x-24 lg:gap-y-16">
          <div>
            <h2 className="text-3xl font-bold mb-2">ai research</h2>
            <p>
              I've published a few papers as first author<br></br>@ Queen’s U,
              with{" "}
              <Link
                href="https://www.xiaodanzhu.com/"
                className="underline"
                target="_blank"
              >
                Prof. Xiaodan Zhu
              </Link>
              <br></br>
            </p>
          </div>
          <div></div>
          <div></div>
          <div className="ml-3 lg:ml-0">
            {papers.map((paper, i) => (
              <Fragment key={i}>
                {i != 0 && <hr className="my-6 border-black" />}
                <div>
                  <Link
                    href={paper.link}
                    className="text-2xl block mb-1.5"
                    target="_blank"
                  >
                    {paper.title}
                  </Link>
                  <p>{paper.venue}</p>
                  <p>
                    {paper.authors.map((author, i) => (
                      <Fragment key={i}>
                        {i != 0 && ", "}
                        {author == "Jonathan Li" ? <b>{author}</b> : author}
                      </Fragment>
                    ))}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <Sep2AltSvg className="absolute left-0 mt-16 lg:-mt-12" />
        <div className="relative mt-52 lg:mt-80 2xl:mt-96">
          <SideSvg className="absolute mt-6 h-full -left-2 w-[8%] hidden lg:block lg:w-auto lg:-left-20" />
          <div className="flex flex-row items-end gap-8 mb-16 lg:mb-28 flex-wrap lg:flex-nowrap">
            <h2 className="font-bold text-3xl">website designs</h2>
            <p>
              A few years ago I started{" "}
              <Link
                href="https://www.riftium.ca"
                target="_blank"
                className="underline"
              >
                Riftium
              </Link>
              , a web design firm, with{" "}
              <Link href="https://davidy.li" target="_blank">
                my brother
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-x-16 gap-y-12 pb-24 lg:pb-64 lg:ml-32 lg:gap-y-28">
            {websites.map((website, i) => (
              <div
                key={i}
                className="relative flex-grow-1 basis-full lg:flex-shrink-0 lg:flex-grow-0 lg:basis-[500px] 2xl:basis-[600px]"
              >
                <Link href={website.link} target="_blank">
                  <Image
                    src={website.image}
                    alt=""
                    className="w-full h-auto border-4 border-black"
                  ></Image>
                </Link>
                <Link
                  href={website.link}
                  target="_blank"
                  className="font-bold mt-4 mb-0 block"
                >
                  {website.displayLink}
                </Link>
                <p>{website.description}</p>
              </div>
            ))}
          </div>
        </div>
        <h2 className="font-bold text-3xl ml-2">
          selected personal/​&#8203;hackathon projects
        </h2>
        <div
          className={`w-full grid grid-cols-[max-content_auto] grid-rows-${hackathonProjects.length} gap-y-2 mt-8 ml-2 lg:ml-4`}
        >
          {hackathonProjects.map((project, i) => (
            <Fragment key={i}>
              <Link
                href={project.link}
                target="_blank"
                className="font-bold pr-4 text-md lg:text-lg"
              >
                {project.name}
              </Link>
              <div className="flex flex-row flex-wrap gap-x-2 lg:gap-x-4">
                <Link
                  href={project.link}
                  target="_blank"
                  className="font-light text-md lg:text-lg"
                >
                  {project.description}
                </Link>
                <div>
                  <p className="pr-2 inline-block text-md lg:pr-4 lg:text-lg">
                    |
                  </p>
                  <p className="inline-block text-md lg:text-lg">
                    {project.result}
                  </p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        <hr className="border-black my-8 w-11/12 ml-2 lg:ml-0 lg:w-3/4"></hr>
        <div
          className={`grid grid-cols-[max-content_auto] grid-rows-${hackathonProjects.length} gap-y-2 mt-8 ml-4 mr-4 lg:mr-0`}
        >
          {personalProjects.map((project, i) => (
            <Fragment key={i}>
              <Link
                href={project.link}
                target="_blank"
                className="font-bold text-md pr-4 lg:text-lg"
              >
                {project.name}
              </Link>
              <Link
                href={project.link}
                target="_blank"
                className="text-md font-light lg:text-lg"
              >
                {project.description}
              </Link>
            </Fragment>
          ))}
        </div>
        <SpeechSvg className="absolute left-0 lg:-mt-24" />
        <div className="mt-[37%] ml-[13%] w-7/12 lg:w-auto lg:mt-96 lg:ml-[12.5rem] 2xl:mt-[32%] 2xl:ml-[calc(31%-100px)]">
          <h2 className="font-bold text-3xl">jonathan li</h2>
          <p>
            Reach out to me via{" "}
            <Link href="mailto:li.jonathan42@gmail.com" className="underline">
              email
            </Link>{" "}
            (li.jonathan42@gmail.com) or{" "}
            <Link
              href="https://www.linkedin.com/in/jonatli/"
              target="_blank"
              className="underline"
            >
              Linkedin
            </Link>
            .
          </p>
        </div>
      </main>
    </>
  );
}
